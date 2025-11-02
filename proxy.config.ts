import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;

  // allowlist to avoid redirect loops and permit static/_next assets
  const allowlist = [
    "/dashboard/login",
    "/dashboard/unauthorized",
    "/api/auth", // allow auth endpoints so login can work
    "/_next",
    "/favicon.ico",
    "/robots.txt",
  ];
  if (allowlist.some((p) => pathname.startsWith(p))) {
    const res = NextResponse.next();
    // still set CSP for allowed responses
    res.headers.set("Content-Security-Policy", buildCsp());
    return res;
  }

  // quick cookie check: prefer 'user' (JSON) for fast middleware decisions
  const userCookie = req.cookies.get("user")?.value;
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      if (user && user.userRole) {
        const res = NextResponse.next();
        res.headers.set("Content-Security-Policy", buildCsp());
        return res;
      }
    } catch {
      // invalid cookie — fall through to other checks / redirect
    }
  }

  // fallback: if server issues HttpOnly access_token cookie, validate it by calling /api/v1/auth/me
  const accessToken = req.cookies.get("access_token")?.value;
  if (accessToken) {
    try {
      const meResp = await fetch(`${origin}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          // forward cookies from the original request so the backend sees the token
          cookie: req.headers.get("cookie") ?? "",
          Accept: "application/json",
        },
      });
      if (meResp.ok) {
        const res = NextResponse.next();
        res.headers.set("Content-Security-Policy", buildCsp());
        return res;
      }
      if (meResp.status === 401 || meResp.status === 403) {
        const loginUrl = new URL("/dashboard/login", origin);
        loginUrl.searchParams.set("returnTo", pathname + search);
        const redirectResp = NextResponse.redirect(loginUrl);

        // clear client-readable cookie and any local cookie we set for quick-check
        redirectResp.headers.append(
          "Set-Cookie",
          `user=; Path=/; Max-Age=0; SameSite=Lax`
        );

        redirectResp.headers.set("Content-Security-Policy", buildCsp());
        return redirectResp;
      }
    } catch {
      // validation failed — will redirect below
    }
  }

  // not authenticated → redirect to login with returnTo
  const loginUrl = new URL("/login", origin);
  loginUrl.searchParams.set("returnTo", pathname + search);
  const redirectResp = NextResponse.redirect(loginUrl);
  redirectResp.headers.set("Content-Security-Policy", buildCsp());
  return redirectResp;
}

function buildCsp() {
  return `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://widget.dojah.io https:;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https:;
    font-src 'self' data: https://fonts.gstatic.com https://fonts.gstatic.com/s/inter/ https://fonts.gstatic.com/s/readex/ https://fonts.gstatic.com/s/poppins/;
    connect-src 'self' https://*.nextjs.org http://localhost:3000 http://localhost:2000 http://127.0.0.1:3000 http://127.0.0.1:2000 https://j0vc94b3-9999.uks1.devtunnels.ms https://api.dojah.io https://*.dojah.io https:;
    frame-src 'self' https://widget.dojah.io https://*.dojah.io;
    frame-ancestors 'none';
    img-src 'self' data: https:;
    form-action 'self';
    base-uri 'self';
    object-src 'none';
    media-src 'self';
  `
    .replace(/\s{2,}/g, " ")
    .trim();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};

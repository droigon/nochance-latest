import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Role-based route access control
function isAuthorizedForRoute(userRole: string, pathname: string): boolean {
  // Define role-specific route patterns
  const roleRoutes = {
    USER: [
      "/dashboard", // Allow root dashboard (will redirect to /dashboard/user)
      "/dashboard/user",
      "/dashboard/user/*"
    ],
    VENDOR: [
      "/dashboard", // Allow root dashboard (will redirect to /dashboard/vendor)
      "/dashboard/vendor", 
      "/dashboard/vendor/*"
    ],
    ADMIN: [
      "/dashboard", // Allow root dashboard (will redirect to /dashboard/admin)
      "/dashboard/admin",
      "/dashboard/admin/*",
      "/dashboard/user", // Admins can access user routes
      "/dashboard/user/*",
      "/dashboard/vendor", // Admins can access vendor routes  
      "/dashboard/vendor/*"
    ]
  };

  const allowedRoutes = roleRoutes[userRole as keyof typeof roleRoutes] || [];
  
  const isAuthorized = allowedRoutes.some(route => {
    if (route.endsWith('/*')) {
      const baseRoute = route.slice(0, -2);
      return pathname.startsWith(baseRoute);
    }
    return pathname === route;
  });
  
  if (process.env.NODE_ENV === "development") {
    console.log(`[Role Check] User: ${userRole}, Path: ${pathname}, Authorized: ${isAuthorized}`);
    console.log(`[Role Check] Allowed routes:`, allowedRoutes);
  }
  
  return isAuthorized;
}

export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === "development") {
    console.log(`[Middleware] ${req.method} ${pathname}, origin: ${origin}`);
  }

  // allowlist to avoid redirect loops and permit static/_next assets
  const allowlist = [
    "/dashboard/unauthorized",
    "/dashboard/login", // allow login page
    "/login", // allow main login page
    "/api/auth", // allow auth endpoints so login can work
    "/api/v1/auth", // allow v1 auth endpoints
    "/_next",
    "/favicon.ico",
    "/robots.txt",
    "/assets", // allow static assets
  ];
  if (allowlist.some((p) => pathname.startsWith(p))) {
    const res = NextResponse.next();
    // still set CSP for allowed responses
    res.headers.set("Content-Security-Policy", buildCsp());
    return res;
  }

  // quick cookie check: prefer 'user' (JSON) for fast middleware decisions

  const userCookie = req.cookies.get("user")?.value;
  console.log("User Cookie:", userCookie);
  if (userCookie) {
    try {
      const user = JSON.parse(userCookie);
      if (user && user.userRole) {
        // Check if user role is authorized for this route
        if (isAuthorizedForRoute(user.userRole, pathname)) {
          const res = NextResponse.next();
          res.headers.set("Content-Security-Policy", buildCsp());
          return res;
        } else {
          // User is authenticated but not authorized for this route
          console.log(`[Middleware] User role ${user.userRole} not authorized for ${pathname}`);
          const unauthorizedUrl = new URL("/dashboard/unauthorized", origin);
          const redirectResp = NextResponse.redirect(unauthorizedUrl);
          redirectResp.headers.set("Content-Security-Policy", buildCsp());
          return redirectResp;
        }
      }
    } catch {
      // invalid cookie — fall through to other checks / redirect
    }
  }

  // fallback: if server issues HttpOnly access_token cookie, validate it by calling /api/v1/auth/me
  const accessToken = req.cookies.get("access_token")?.value;
  if (process.env.NODE_ENV === "development") {
    console.log("Access Token:", accessToken);
  }

  if (accessToken) {
    try {
      if (process.env.NODE_ENV === "development") {
        console.log("[Middleware] Validating access token...");
      }

      // Use dynamic API URL - try external API first, fallback to internal
      const apiBaseUrl =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:2000";
      const meUrl = `${apiBaseUrl}/api/v1/auth/me`;

      console.log("Me URL:", meUrl);
      const meResp = await fetch(meUrl, {
        method: "GET",
        headers: {
          // forward cookies from the original request so the backend sees the token
          cookie: req.headers.get("cookie") ?? "",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`, // Also send as Bearer token
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(10000), // Increased timeout to 10 seconds
      });
      console.log("Me Response Status:", meResp.status, meResp.statusText);

      if (meResp.ok) {
        if (process.env.NODE_ENV === "development") {
          console.log("[Middleware] Access token valid, allowing access");
        }

        // Get user data from /me endpoint and set it in cookie for quick future checks
        try {
          const userData = await meResp.json();
          
          // Check if user role is authorized for this route
          if (userData && userData.userRole) {
            if (isAuthorizedForRoute(userData.userRole, pathname)) {
              const res = NextResponse.next();
              
              // Update user cookie with fresh data from /me endpoint
              res.headers.append(
                "Set-Cookie",
                `user=${encodeURIComponent(
                  JSON.stringify(userData)
                )}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`
              );

              res.headers.set("Content-Security-Policy", buildCsp());
              return res;
            } else {
              // User is authenticated but not authorized for this route
              console.log(`[Middleware] User role ${userData.userRole} not authorized for ${pathname}`);
              const unauthorizedUrl = new URL("/dashboard/unauthorized", origin);
              const redirectResp = NextResponse.redirect(unauthorizedUrl);
              redirectResp.headers.set("Content-Security-Policy", buildCsp());
              return redirectResp;
            }
          }
          
          // If no userRole, allow access but don't set cookie
          const res = NextResponse.next();
          res.headers.set("Content-Security-Policy", buildCsp());
          return res;
        } catch {
          // If JSON parsing fails, still allow access but don't update user cookie
          const res = NextResponse.next();
          res.headers.set("Content-Security-Policy", buildCsp());
          return res;
        }
      }

      if (process.env.NODE_ENV === "development") {
        console.log(
          `[Middleware] Auth check failed with status: ${meResp.status}`
        );
      }

      if (meResp.status === 401 || meResp.status === 403) {
        const loginUrl = new URL("/login", origin);
        loginUrl.searchParams.set("returnTo", pathname + search);
        const redirectResp = NextResponse.redirect(loginUrl);

        // clear both user and access_token cookies
        redirectResp.headers.append(
          "Set-Cookie",
          `user=; Path=/; Max-Age=0; SameSite=Lax`
        );
        redirectResp.headers.append(
          "Set-Cookie",
          `access_token=; Path=/; Max-Age=0; SameSite=Lax`
        );

        redirectResp.headers.set("Content-Security-Policy", buildCsp());
        return redirectResp;
      }
    } catch (error) {
      // validation failed — check if it's a network error vs auth error
      console.error("[Middleware] Auth check failed:", error);

      // If it's a network error (timeout, connection refused, etc.),
      // don't redirect to login, just continue
      if (error instanceof TypeError || error instanceof Error) {
        if (
          error.message.includes("timeout") ||
          error.message.includes("fetch") ||
          error.message.includes("ECONNREFUSED")
        ) {
          console.log(
            "[Middleware] Network error, allowing access without validation"
          );
          const res = NextResponse.next();
          res.headers.set("Content-Security-Policy", buildCsp());
          return res;
        }
      }
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
  matcher: [
    "/dashboard/:path*",
    // Add other protected routes if needed
    // "/admin/:path*",
    // "/profile/:path*"
  ],
};

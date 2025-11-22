import { NextResponse } from "next/server";

// Replace this with however you normally get the current user
async function getCurrentUser(req: Request) {
  // If you’re using NextAuth:
  // const session = await getServerSession(authOptions);
  // return session?.user;

  // Or if your frontend sends a cookie or token:
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  }).then((res) => (res.ok ? res.json() : null));

  return user;
}

//export async function GET(req: Request) {
//  const user = await getCurrentUser(req);
//
//  if (!user?.id) {
//    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//  }
//
//  const config = {
//    app_id: process.env.DOJAH_APP_ID,
//    p_key: process.env.DOJAH_PUBLIC_KEY,
//    type: "liveness",
//    metadata: {
//      user_id: user.id, // ✅ pulled securely from backend
//    },
//    config: {
//      widget_id: process.env.DOJAH_WIDGET_ID,
//    },
//  };
//
//  return NextResponse.json(config);
//}

export async function GET(req: Request) {
  const userId = await getUserFromSession(req); // your auth logic
  if (!userId)
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });

  return NextResponse.json({
    scriptUrl: "https://widget.dojah.io/widget.js",
    options: {
      app_id: process.env.DOJAH_APP_ID!,
      p_key: process.env.DOJAH_PUBLIC_KEY!,
      type: "liveness",
      metadata: { user_id: "123" },
      config: { widget_id: process.env.DOJAH_WIDGET_ID! },
      email: "ude.chekwube@gmail.com",
    },
  });
}
// Example mock
async function getUserFromSession(req: Request) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;
  return "user_abc123"; // Replace with your real user fetch logic
}

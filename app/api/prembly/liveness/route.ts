import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = await fetch("https://api.prembly.com/liveness/initiate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PREMBLY_API_KEY!, // secure
      },
      body: JSON.stringify({
        customer_ref: "user-123", // your internal user ID
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/liveness/callback`,
      }),
    });

    const data = await response.json();
    console.log("Prembly Liveness Response:", data);

    return NextResponse.json({ url: data?.liveness_url });
  } catch (error) {
    console.error("Prembly Liveness Error:", error);
    return NextResponse.json(
      { error: "Failed to create liveness session" },
      { status: 500 }
    );
  }
}

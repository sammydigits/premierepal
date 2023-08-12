import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const subscription = await req.text();

  const res = await fetch(
    process.env.NEXT_PUBLIC_SAVE_SUBSCRIPTION_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: subscription,
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}

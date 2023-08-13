import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const subscription = await req.text();
  const { userId } = auth();

  const res = await fetch(
    process.env.NEXT_PUBLIC_SAVE_SUBSCRIPTION_ENDPOINT as string,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, subscription: subscription }),
    }
  );
  const data = await res.json();

  return NextResponse.json(data);
}

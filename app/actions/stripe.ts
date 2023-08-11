"use server";

import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

export async function createCheckoutSession(data: FormData): Promise<void> {
  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price: "price_1Nd4HNE8aLrdx6oVt2NLZhcY",
        },
      ],
      success_url: `${headers().get(
        "origin"
      )}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get("origin")}/checkout`,
    });

  redirect(checkoutSession.url as string);
}

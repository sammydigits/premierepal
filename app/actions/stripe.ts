"use server";

import type { Stripe } from "stripe";

import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe";

import { currentUser } from "@clerk/nextjs";

export async function createCheckoutSession(): Promise<void> {
  const user = await currentUser();

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.create({
      mode: "subscription",
      client_reference_id: user?.id,
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          quantity: 1,
          price: "price_1Nd4HNE8aLrdx6oVt2NLZhcY",
        },
      ],
      success_url: `${headers().get(
        "origin"
      )}/checkout/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headers().get("origin")}/checkout/result?cancelled=true`,
    });

  redirect(checkoutSession.url as string);
}

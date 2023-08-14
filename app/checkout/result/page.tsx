import type { Stripe } from "stripe";

import PrintObject from "@/components/PrintObject";
import { stripe } from "@/lib/stripe";
import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}): Promise<JSX.Element> {
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id);

  return (
    <>
      {checkoutSession.status === "complete" && (
        <div>
          <h1>Thank you for subscribing</h1>
          <p>
            Now go{" "}
            <Link href="/notifications">set your notification preferences</Link>
            .
          </p>
        </div>
      )}
      {/* <h3>Checkout Session response:</h3> */}
      {/* <PrintObject content={checkoutSession} /> */}
    </>
  );
}

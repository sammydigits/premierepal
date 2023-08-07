import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Pay with Checkout | Premiere Pal",
};

export default function DonatePage(): JSX.Element {
  return (
    <div className="page-container">
      <h1>Pay with Checkout</h1>
      <CheckoutForm />
    </div>
  );
}

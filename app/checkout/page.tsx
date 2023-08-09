import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Pay with Checkout | Premiere Pal",
};

export default function CheckoutPage(): JSX.Element {
  return (
    <ul>
      <li>
        <CheckoutForm />
      </li>
    </ul>
  );
}

import type { Metadata } from "next";

import CheckoutForm from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Premiere Pal",
};

export default function CheckoutPage(): JSX.Element {
  return <CheckoutForm />;
}

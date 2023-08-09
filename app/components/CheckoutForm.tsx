"use client";

import React, { useState } from "react";

import { createCheckoutSession } from "@/actions/stripe";

export default function CheckoutForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <form action={createCheckoutSession}>
      <button type="submit" disabled={loading}>
        Subscribe
      </button>
    </form>
  );
}

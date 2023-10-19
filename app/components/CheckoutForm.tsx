"use client";
import { Button } from "@nextui-org/react";

import { createCheckoutSession } from "@/actions/stripe";
import { useState } from "react";

export default function CheckoutForm(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    createCheckoutSession();
  };

  return (
    <>
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Almost done
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Thanks for signing up, click the button below to finish
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            color="primary"
            type="submit"
            isLoading={loading}
            onClick={handleClick}
          >
            Continue to payment
          </Button>
        </div>
      </div>
    </>
  );
}

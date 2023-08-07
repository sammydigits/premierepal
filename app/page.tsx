import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Premiere Pal",
};

export default function IndexPage(): JSX.Element {
  return (
    <ul className="card-list">
      <li>
        <Link href="/checkout" className="card checkout-style-background">
          <h2 className="bottom">Checkout</h2>
        </Link>
      </li>
    </ul>
  );
}

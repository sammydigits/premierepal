import type { Metadata } from "next";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Premiere Pal",
};

export default function IndexPage(): JSX.Element {
  return (
    <ul>
      <li>
        <Link href="/checkout">Subscribe</Link>
      </li>
      <li>
        <a href="https://billing.stripe.com/p/login/test_dR62968cu3J6aHK9AA">
          Manage Subscription
        </a>
      </li>
    </ul>
  );
}

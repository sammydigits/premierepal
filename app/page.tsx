"use client";

import type { Metadata } from "next";

import Link from "next/link";
import { useEffect } from "react";

export default function IndexPage(): JSX.Element {
  useEffect(() => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        )
      )
      .catch((err) => console.log("Service Worker registration failed: ", err));
  }, []);

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
      <li>
        <Link href="/notifications">Notifications</Link>
      </li>
    </ul>
  );
}

import Link from "next/link";

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
      <li>
        <Link href="/notifications">Notifications</Link>
      </li>
    </ul>
  );
}

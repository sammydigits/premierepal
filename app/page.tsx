import Link from "next/link";
import SearchForm from "./components/SearchForm";

export default async function IndexPage(): Promise<JSX.Element> {
  return (
    <>
      <ul>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/checkout">Checkout</Link>
        </li>
        <li>
          <a href="https://billing.stripe.com/p/login/test_dR62968cu3J6aHK9AA">
            Manage Billing
          </a>
        </li>
        <li>
          <Link href="/notifications">Manage Notifications</Link>
        </li>
      </ul>

      <SearchForm />
    </>
  );
}

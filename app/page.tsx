import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

export default async function IndexPage(): Promise<JSX.Element> {
  const user = await currentUser();
  return (
    <>
      <p className="text-3xl font-bold">
        Hello {user ? user?.firstName : "unknown user"}
      </p>
      <ul>
        <li>
          <Link href="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
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
    </>
  );
}

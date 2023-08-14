import Link from "next/link";
import SearchForm from "./components/SearchForm";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import About from "./components/About";

export default async function IndexPage(): Promise<JSX.Element> {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-2.5 sm:px-6 sm:py-2.5 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" />
                </radialGradient>
              </defs>
            </svg>
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Stay up to date with your favorite actors, directors, and TV
                shows
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Get notified when your favorite actors or directors make new
                movies, and your favorite TV shows get new seasons.
              </p>

              <p className="mt-2 leading-7 text-gray-400">
                Track all your favorites for only $0.99/month
              </p>
            </div>
            <div className="lg:py-24 text-center lg:text-left">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      <Features />

      <Pricing />

      <About />

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
    </>
  );
}

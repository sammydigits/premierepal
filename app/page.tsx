import Link from "next/link";
import SearchForm from "./components/SearchForm";

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

      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="mx-auto h-12 text-center text-6xl">🎬</div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “I needed an automated way to know when my favorite actors and
                directors made new movies, so I made this tool for myself. But I
                soon realized others might find value in it. With the addition
                of new seasons of TV shows, I think it makes a pretty nice
                tool.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-20 w-20 rounded-full"
                src="https://avatars.githubusercontent.com/u/1637993?v=4"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Sam Thompson</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">Creator of Premiere Pal</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

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

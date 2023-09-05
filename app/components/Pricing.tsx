import { CheckIcon } from "@heroicons/react/20/solid";
import SearchAutocomplete from "./SearchAutocomplete";

const includedFeatures = [
  "Track unlimitied actors, directors, and TV shows",
  "Choose from email, push and SMS notifications",
  "Entry to annual conference",
  "Official member t-shirt",
];

export default function Pricing() {
  return (
    <div className="bg-white" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Get notified about new releases from your favorite actors,
              directors, and TV shows
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              For only <span className="text-indigo-600">$0.99/month</span>,
              never miss that new movie, new season, or new staring role.
            </p>
            <ul
              role="list"
              className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
            >
              {includedFeatures.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    className="h-6 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-8">
              <div className="mx-auto max-w-sm px-0">
                <p className="text-base font-semibold text-gray-600 mb-5">
                  Start now
                </p>
                <SearchAutocomplete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

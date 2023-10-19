import SearchAutocomplete from "./SearchAutocomplete";

export default function Main() {
  return (
    <div className="bg-white" id="pricing">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-4xl font-bold tracking-tight text-gray-900">
              Get updates about your favorite actors, directors, and TV shows
            </h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              For only <span className="text-indigo-600">$0.99/month</span>,
              we'll send you a notifcation when your favorite actor or director
              makes a new movie, or your favorite TV show gets a new season.
            </p>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
            <div className="rounded-2xl bg-gray-50 py-10 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-8">
              <div className="mx-auto max-w-sm px-0">
                <SearchAutocomplete />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

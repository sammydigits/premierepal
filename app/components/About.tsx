export default function About() {
  return (
    <section
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"
      id="about"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <div className="mx-auto h-12 text-center text-6xl">🎬</div>
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              “I needed an automated way to know when my favorite actors and
              directors made new movies, so I made this tool for myself. But I
              soon realized others might find value in it. With the addition of
              new seasons of TV shows, I think it makes a pretty nice tool.”
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
  );
}

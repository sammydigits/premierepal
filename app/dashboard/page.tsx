"use client";

import { User } from "@nextui-org/react";
import { useCookies } from "react-cookie";

export default function DashboardPage(): JSX.Element {
  const [cookies, setCookie] = useCookies(["ppData"]);

  console.log("reading your cookies", cookies.ppData);
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Premiere Pal
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div>
              <ul className="user-selections mt-5">
                {cookies.ppData.map((item: any) => {
                  const image = item.value.split("_")[1];
                  return (
                    <li key={item.value} className="mb-3">
                      <User
                        name={item.label}
                        avatarProps={{
                          src: `https://image.tmdb.org/t/p/w45/${image}.jpg`,
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>right</div>
          </div>
        </div>
      </div>
    </div>
  );
}

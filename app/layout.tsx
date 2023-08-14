import "../styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";

import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

import { Inter } from "next/font/google";
import Navigation from "./components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Premiere Pal",
    template: `%s - Premiere Pal`,
  },
  description: "Test Description",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  const currentYear = new Date().getFullYear();
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <title>Premiere Pal</title>
        </head>
        <body className={inter.className}>
          <Providers>
            <Navigation />

            <main>{children}</main>

            <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 mx-auto max-w-7xl">
              <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  © {currentYear}{" "}
                  <a
                    href="https://premierepal.com/"
                    className="hover:underline"
                  >
                    🎬 Premiere Pal
                  </a>
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6 ">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="mr-4 hover:underline md:mr-6">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/sammydigits/premierepal"
                      className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      target="_blank"
                    >
                      <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">GitHub account</span>
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <div className="text-tiny text-default-400 text-center m-12">
              This product uses the{" "}
              <a href="https://www.themoviedb.org/" target="_blank">
                TMDb API
              </a>{" "}
              but is not endorsed or certified by TMDb.
            </div>
          </Providers>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

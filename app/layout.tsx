import "../styles/globals.css";
import { Metadata } from "next";
import { Providers } from "./providers";

import { ClerkProvider, UserButton } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";

import Link from "next/link";
import { ThemeSwitcher } from "./components/ThemeSwitcher";

export const metadata: Metadata = {
  title: {
    default: "Test",
    template: `%s - Test 2`,
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
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <title>Premiere Pal</title>
        </head>
        <body>
          <Providers>
            <header
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px",
              }}
            >
              <Link href="/" className="text-3xl font-bold">
                Premiere Pal
              </Link>
              <ThemeSwitcher />
              <UserButton afterSignOutUrl="/" />
            </header>

            <main
              style={{
                padding: "20px",
              }}
            >
              {children}
            </main>
          </Providers>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

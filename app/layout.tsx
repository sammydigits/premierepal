import { ClerkProvider, UserButton } from "@clerk/nextjs";

import { Analytics } from "@vercel/analytics/react";

import type { Metadata } from "next";

import Link from "next/link";

import "../styles.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: "Premiere Pal",
    template: "%s | Premiere Pal",
  },
  twitter: {
    card: "summary_large_image",
    description: "Premiere Pal",
    images: [
      {
        url: "https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png",
      },
    ],
    site: "@PremierePal",
    title: "Premiere Pal",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <title>Premiere Pal</title>
        </head>
        <body>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px",
            }}
          >
            <Link href="/">Premiere Pal</Link>
            <UserButton afterSignOutUrl="/" />
          </header>

          <main>{children}</main>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

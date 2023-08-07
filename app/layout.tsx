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
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <div className="header-content">
              <Link href="/" className="logo">
                Premiere Pal
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

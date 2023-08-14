import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premiere Pal | Thanks",
};

export default function ResultLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <div>{children}</div>;
}

import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Authentication Area",
  description: "-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

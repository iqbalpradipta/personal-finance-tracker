import type { Metadata } from "next";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "-",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex">
          <div className="flex-1">
            <Sidebar />
          </div>
          <div className="flex-4 border border-gray-100 bg-white shadow-xl">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

"use client";

import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { HiMenu } from "react-icons/hi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  return (
    <div className="flex h-screen bg-gray-100">
      {" "}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <HiMenu className="h-6 w-6" />
      </button>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div
        className={`w-64 bg-white shadow-xl h-screen overflow-y-auto z-50 fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:block md:flex-shrink-0 transition-transform duration-300 ease-in-out`}
      >
        <Sidebar />
      </div>
      <main
        className={`
          flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 ease-in-out`}
      >
        <div className="md:pt-0 pt-16">{children}</div>
      </main>
    </div>
  );
}

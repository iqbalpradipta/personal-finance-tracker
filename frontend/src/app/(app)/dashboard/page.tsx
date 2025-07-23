"use client";

import RecentTransaction from "@/components/dashboard/RecentTransaction";
import SummaryCard from "@/components/dashboard/SummaryCard";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = React.useState([]);
  const [summary, setSummary] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/transactions");
        setTransactions(response.data.data);
      } catch (err: any) {
        console.error("Error fetching transactions:", err);
      }
    };

    const fetchSummary = async () => {
      try {
        const summary = await api.get("/summary");
        setSummary(summary.data.data);
      } catch (err: any) {
        console.error("Error fetching Summary:", err);
      }
    };

    fetchSummary();
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-400">
            Selamat Datang! Berikut Ringkasan keuangan anda.
          </p>
        </div>
        <SummaryCard summary={summary} />
        <RecentTransaction transactions={transactions} />
      </div>
    </div>
  );
}

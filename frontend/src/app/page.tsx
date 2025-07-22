import RecentTransaction from "@/components/dashboard/RecentTransaction";
import SummaryCard from "@/components/dashboard/SummaryCard";
import Image from "next/image";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Selamat Datang! Berikut Ringkasan keuangan anda.
        </p>
      </div>

      <SummaryCard />
      <RecentTransaction />
    </div>
  );
}

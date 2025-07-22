import RecentTransaction from "@/components/dashboard/RecentTransaction";
import SummaryCard from "@/components/dashboard/SummaryCard";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
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

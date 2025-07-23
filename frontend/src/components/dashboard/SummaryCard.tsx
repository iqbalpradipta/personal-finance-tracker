import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

function SummaryCard({ summary }: SummaryCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div className="p-4 sm:p-6 rounded-xl shadow-xl border border-green-400 bg-green-600 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Total Income</h3>
          <GrMoney className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="text-3xl sm:text-3xl font-bold">
          {summary ? formatCurrency(summary.income) : "Rp 0"}
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl shadow-sm border border-red-400 bg-red-800 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Expenses</h3>
          <GiPayMoney className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="text-3xl sm:text-3xl font-bold">
          {summary ? formatCurrency(summary.expenses) : "Rp 0"}
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl shadow-sm border border-blue-400 bg-blue-800 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Balance</h3>
          <FaMoneyBillWave className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <div className="text-3xl sm:text-3xl font-bold">
          {summary ? formatCurrency(summary.balance) : "Rp 0"}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
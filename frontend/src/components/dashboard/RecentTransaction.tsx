import React from "react";
import { GrMoney } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { FaMoneyBillWave } from "react-icons/fa";
import Link from "next/link";

function RecentTransaction({ transactions }: RecentTransactionProps) {
  const getTransactionIcon = (type: "Income" | "Expenses") => {
    if (type === "Income") return <GrMoney className="text-green-500" />;
    if (type === "Expenses") return <GiPayMoney className="text-red-500" />;
    return <FaMoneyBillWave className="text-gray-500" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <Link href={"/transaction"} className="text-blue-600 hover:text-blue-800 font-medium text-sm w-full sm:w-auto">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Description</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
              <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Amount</th>
              <th scope="col" className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider block sm:hidden rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-20 text-center text-gray-500">
                  Tidak ada transaksi terbaru ditemukan.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.ID} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap hidden sm:table-cell">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${transaction.type === 'Income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.CreatedAt)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-sm hidden sm:table-cell">
                    <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-sm block sm:hidden">
                    <span className={transaction.type === 'Income' ? 'text-green-600' : 'text-red-600'}>
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;
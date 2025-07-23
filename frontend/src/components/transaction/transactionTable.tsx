import React from "react";
import { GrMoney } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function TransactionTable({
  transactions,
  currentPage,
  itemsPerPage,
  hasMore,
  onPageChange,
  onEditTransaction,
  onDeleteTransaction
}: TransactionTableProps) {
  const getTransactionIcon = (type: "Income" | "Expenses") =>
    type === "Income" ? (
      <GrMoney className="text-green-500" />
    ) : (
      <GiPayMoney className="text-red-500" />
    );

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

  const currentMinItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const currentMaxItemIndex = (currentPage - 1) * itemsPerPage + transactions.length;

  return (
    <div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell"
              >
                Type
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-20 text-center text-gray-500"
                >
                  Tidak ada transaksi yang ditemukan.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.ID}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.type === "Income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 justify-center whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                    {formatDate(transaction.CreatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm hidden md:table-cell">
                    <span
                      className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        transaction.type === "Income"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-sm">
                    <span
                      className={
                        transaction.type === "Income"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => onEditTransaction(transaction.ID)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Edit Transaction"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteTransaction(transaction.ID)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Transaction"
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-700 gap-4">
        <span>
          Page{" "}
          <span className="font-semibold">{currentMinItemIndex}</span>{" "}
          to{" "}
          <span className="font-semibold">{currentMaxItemIndex}</span>{" "}
          results
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasMore}
            className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionTable;
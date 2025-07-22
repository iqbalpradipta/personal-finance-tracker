import React from "react";
import {
  FaArrowUpRightFromSquare,
  FaHandHoldingDollar,
  FaDownLeftAndUpRightToCenter,
} from "react-icons/fa6";

function RecentTransaction() {
  const placeholderRows = [1, 2, 3, 4, 5];

  const getPlaceholderIcon = (index: number) => {
    if (index % 3 === 0)
      return <FaArrowUpRightFromSquare className="text-green-500" />;
    if (index % 3 === 1)
      return <FaDownLeftAndUpRightToCenter className="text-red-500" />;
    return <FaHandHoldingDollar className="text-blue-500" />;
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
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
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg"
              >
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {placeholderRows.map((_, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {getPlaceholderIcon(index)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>{" "}
                      {/* Placeholder teks */}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>{" "}
                    {/* Placeholder kategori */}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>{" "}
                  {/* Placeholder tanggal */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-sm">
                  <div className="w-32 h-4 bg-gray-200 rounded ml-auto animate-pulse"></div>{" "}
                  {/* Placeholder jumlah */}
                </td>
              </tr>
            ))}
            {/*
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No recent transactions.
              </td>
            </tr>
            */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransaction;

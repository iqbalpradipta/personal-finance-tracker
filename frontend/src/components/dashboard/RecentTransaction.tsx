import React from "react";
import { FaMoneyBillWave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";

function RecentTransaction() {
  const placeholderRows = Array.from({ length: 5 });

  const getPlaceholderIcon = (index: number) => {
    if (index % 3 === 0) return <GrMoney className="text-green-500" />;
    if (index % 3 === 1) return <GiPayMoney className="text-red-500" />;
    return <FaMoneyBillWave className="text-blue-500" />;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Recent Transactions
        </h2>
        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm w-full sm:w-auto">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider block sm:hidden rounded-tr-lg"
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
                <td className="px-3 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                      {getPlaceholderIcon(index)}
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap hidden sm:table-cell">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </span>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                  <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-sm hidden sm:table-cell">
                  <div className="w-24 h-4 bg-gray-200 rounded ml-auto animate-pulse"></div>
                </td>
                <td className="px-3 py-2 whitespace-nowrap text-right font-medium text-sm block sm:hidden">
                  <div className="w-24 h-4 bg-gray-200 rounded ml-auto animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

{
  /*
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                No recent transactions.
              </td>
            </tr>
            */
}

export default RecentTransaction;

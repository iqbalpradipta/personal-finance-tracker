import React from "react";
import { FaPlus, FaCalendarAlt, FaFilter } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";

function Transaction() {
  const placeholderRows = Array.from({ length: 10 });
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">All Transactions</h2>
        <button className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-base font-semibold">
          <FaPlus className="mr-2 h-4 w-4" />
          Add New Transaction
        </button>
      </div>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
        {/* Filter by Date Range */}
        <div className="flex flex-col">
          <label
            htmlFor="date-range"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Date Range
          </label>
          <div className="relative">
            <input
              type="date"
              id="date-range"
              placeholder="e.g., Last 30 days or Custom"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Filter by Transaction Type */}
        <div className="flex flex-col">
          <label
            htmlFor="transaction-type"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Type
          </label>
          <div className="relative">
            <select
              id="transaction-type"
              className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <TbArrowsSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Placeholder for more filters if needed (e.g., Category, Amount Range) */}
        <div className="flex flex-col">
          <label
            htmlFor="search-category"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Search Category
          </label>
          <input
            type="text"
            id="search-category"
            placeholder="e.g., Salary"
            className="pl-3 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Action Button for Filter (e.g., Apply Filter) */}
        <div className="flex items-end">
          {" "}
          <button className="flex items-center justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200 w-full font-medium text-sm">
            <FaFilter className="mr-2 h-3.5 w-3.5" /> Apply Filters
          </button>
        </div>
      </div>

      {/* Transaction List Table */}
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
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
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
                      {/* Placeholder ikon transaksi */}
                      <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 text-center">
                      <div>Buat Makan</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="w-20 h-4 px-2 inline-flex text-xs leading-5 font-semibold">
                    Kebutuhan Hidup
                  </div>
                </td>
                <td className="px-6 py-4 justify-center whitespace-nowrap text-sm text-gray-500">
                  <div className="w-24 h-4">24-05-2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <span className="px-2 inline-flex text-xs">
                    <div className="w-16 h-4">Expenses</div>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-sm">
                  <div className="w-28 h-4 ml-auto">Rp. 100.000</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex justify-between items-center mt-6 p-4 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-700">
        <span>
          Showing <span className="font-semibold">1</span> to{" "}
          <span className="font-semibold">10</span> of{" "}
          <span className="font-semibold">50</span> results
        </span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md bg-blue-600 text-white">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150">
            2
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150">
            3
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-150">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Transaction;

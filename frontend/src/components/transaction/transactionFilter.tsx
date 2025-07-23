import React from "react";
import { FaCalendarAlt, FaFileExcel } from "react-icons/fa"
import { TbArrowsSort } from "react-icons/tb";

function TransactionFilter({ filterType, startDate, endDate, onFilterChange, onExportExcel }: TransactionFilterProps) {
  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ type: e.target.value });
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ startDate: e.target.value });
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ endDate: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8 p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="flex flex-col">
        <label
          htmlFor="start-date"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Start Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="end-date"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          End Date
        </label>
        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="transaction-type"
          className="text-sm font-medium text-gray-700 mb-1"
        >
          Type
        </label>
        <div className="relative">
          <select
            value={filterType}
            onChange={handleTypeChange}
            className="pl-10 pr-3 py-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none bg-white"
          >
            <option value="">All Types</option>
            <option value="Income">Income</option>
            <option value="Expenses">Expenses</option>
          </select>
          <TbArrowsSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="flex items-end">
        <button
          onClick={onExportExcel}
          className="flex items-center justify-center bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200 text-base font-semibold w-full"
        >
          <FaFileExcel className="mr-2 h-4 w-4" />
          Export to Excel
        </button>
      </div>
    </div>
  );
}

export default TransactionFilter;
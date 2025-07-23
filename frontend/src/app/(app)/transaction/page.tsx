"use client";

import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import api from "@/utils/api";
import TransactionFilter from "@/components/transaction/transactionFilter";
import TransactionTable from "@/components/transaction/transactionTable";
import * as xlsx from "xlsx";
import { saveAs } from "file-saver";
import Link from "next/link";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

function Transaction() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filterType, setFilterType] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchTransactions = async () => {
    try {
      const response = await api.get(`/transaction`, {
        params: {
          type: filterType,
          start: startDate,
          end: endDate,
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setTransactions(response.data.data);
      setHasMore(response.data.data.length === itemsPerPage);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [filterType, startDate, endDate, currentPage]);

  const handleFilterChange = (newFilters: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }) => {
    if (newFilters.type !== undefined) setFilterType(newFilters.type);
    if (newFilters.startDate !== undefined) setStartDate(newFilters.startDate);
    if (newFilters.endDate !== undefined) setEndDate(newFilters.endDate);
    setCurrentPage(1);
  };

  const formatDataForExcel = (data: Transaction[]) => {
    return data.map((item) => ({
      Description: item.description,
      Category: item.category,
      Type: item.type,
      Amount: item.amount,
      Date: new Date(item.CreatedAt).toLocaleDateString("id-ID"),
    }));
  };

  const handleExportExcel = () => {
    const dataToExport = formatDataForExcel(transactions);

    const worksheet = xlsx.utils.json_to_sheet(dataToExport);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(
      dataBlob,
      `transactions_filtered_${new Date().toISOString().slice(0, 10)}.xlsx`
    );
  };

  const handleEditTransaction = async(id: number) => {
    redirect(`transaction/edit/${id}`)
  };

  const handleDeleteTransaction = async (id: number) => {
    try {
      await api.delete(`/transaction/${id}`);
      toast.success("Transaksi berhasil dihapus!");
      fetchTransactions();
    } catch (error: any) {
      console.error("Error deleting transaction:", error);
      let errorMessage = "Gagal menghapus transaksi.";
      if (
        error.response &&
        error.response.data &&
        error.response.data.messages
      ) {
        errorMessage = error.response.data.messages;
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">All Transactions</h2>
        <Link
          href={"/transaction/create"}
          className="flex items-center bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 text-base font-semibold w-full sm:w-auto"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Add New Transaction
        </Link>
      </div>

      <TransactionFilter
        filterType={filterType}
        startDate={startDate}
        endDate={endDate}
        onFilterChange={handleFilterChange}
        onExportExcel={handleExportExcel}
      />

      <TransactionTable
        transactions={transactions}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        hasMore={hasMore}
        onPageChange={setCurrentPage}
        onEditTransaction={handleEditTransaction}
        onDeleteTransaction={handleDeleteTransaction}
      />
    </div>
  );
}

export default Transaction;

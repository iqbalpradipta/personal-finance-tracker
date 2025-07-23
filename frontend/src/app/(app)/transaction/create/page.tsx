"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { PiScrollBold } from "react-icons/pi";

function CreateTransactionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TransactionFormData>({
    type: "",
    amount: "",
    category: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/transaction", {
        type: formData.type,
        amount: formData.amount,
        category: formData.category,
        description: formData.description,
      });

      toast.success("Transaksi berhasil ditambahkan!");
      setFormData({
        type: "",
        amount: "",
        category: "",
        description: "",
      });
      router.push("/transaction");
    } catch (error: any) {
      console.error("Error creating transaction:", error);
      let errorMessage = "Gagal menambahkan transaksi.";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center text-gray-500">
              <PiScrollBold className="w-16 h-16" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-600 mb-8 text-center">
            Add New Transaction
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Transaction Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="">Select Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="e.g., 150000"
                required
                min="0"
                step="1"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="e.g., Gaji, Makanan, Transportasi"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="mt-1 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-400"
                placeholder="Detail transaksi, misal: Beli makan siang di kantin kampus"
                required
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? "Adding Transaction..." : "Add Transaction"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTransactionPage;

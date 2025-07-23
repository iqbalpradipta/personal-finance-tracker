"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { PiScrollBold } from "react-icons/pi";

function EditTransactionPage() {
  const router = useRouter();
  const params = useParams();
  const transactionId = Number(params.id);

  const [formData, setFormData] = useState({
    type: "",
    amount: "",
    category: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchTransaction = async () => {
      try {
        const response = await api.get(`/transaction/${transactionId}`);
        const transaction = response.data.data;

        setFormData({
          type: transaction.type,
          amount: transaction.amount,
          category: transaction.category,
          description: transaction.description,
        });
      } catch (err: any) {
        let errorMessage = "Gagal memuat detail transaksi.";
        toast.error(errorMessage);
      }
    };

    fetchTransaction();
  }, [transactionId, router]);

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
    setSaving(true);

    if (
      !formData.type ||
      !formData.amount ||
      !formData.category ||
      !formData.description
    ) {
      toast.error("Semua field harus diisi.");
      setSaving(false);
      return;
    }
    if (typeof formData.amount !== "number" || formData.amount <= 0) {
      toast.error("Jumlah harus angka positif.");
      setSaving(false);
      return;
    }

    try {
      await api.put(`/transaction/${transactionId}`, {
        type: formData.type,
        amount: formData.amount,
        category: formData.category,
        description: formData.description,
      });

      toast.success("Transaksi berhasil diperbarui!");
      router.push("/transaction");
    } catch (error: any) {
      let errorMessage = "Gagal memperbarui transaksi.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
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
            Edit Transaction
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
                <option value="Expenses">Expenses</option>
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
                disabled={saving}
                className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditTransactionPage;

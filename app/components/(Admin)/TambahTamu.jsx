"use client";

import React, { useState, useEffect } from "react";
import { FaUserPlus, FaArrowLeft, FaUserCheck } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TambahTamu = () => {
  const router = useRouter();
  const [tamuList, setTamuList] = useState([]);

  useEffect(() => {
    const storedTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    setTamuList(storedTamuList);
  }, []);

  // Fungsi untuk menangani submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTamu = {
      id: Date.now(),
      namaLengkap: e.target.nama_lengkap.value,
      noHp: e.target.no_hp.value,
      keperluan: e.target.keperluan.value,
      tanggal: new Date().toLocaleDateString(),
      waktu: new Date().toLocaleTimeString(),
    };

    const updatedTamuList = [...tamuList, newTamu];
    setTamuList(updatedTamuList);
    localStorage.setItem("tamuList", JSON.stringify(updatedTamuList));
    alert("Isi Buku Tamu Berhasil!");
    router.push("/DaftarTamu");
  };

  return (
    <div className="fixed left-0 top-16 bottom-10 right-0 md:left-64 pt-14 pb-6 md:pt-10 md:px-8 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 mx-10 md:mx-40 px-12 py-8 rounded-xl shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-gray-800 dark:text-gray-200 flex items-center justify-center">
          <FaUserPlus className="text-yellow-500 mr-2" /> Tambah Tamu Baru
        </h2>

        <form
          id="guestForm"
          className="space-y-4 sm:space-y-6 text-sm sm:text-md"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div className="input-container col-span-1">
              <input
                type="text"
                id="nama_lengkap"
                name="nama_lengkap"
                required
                placeholder=" "
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <label
                htmlFor="nama_lengkap"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all"
              >
                Nama Lengkap
              </label>
            </div>
            <div className="relative input-container col-span-1 md:my-0 my-4">
              <input
                type="tel"
                id="no_hp"
                name="no_hp"
                required
                placeholder=" "
                pattern="\d+"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                title="Nomor HP hanya boleh berisi angka"
              />
              <label
                htmlFor="no_hp"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all"
              >
                Nomor HP
              </label>
            </div>

            <div className="relative input-container col-span-2">
              <input
                type="text"
                id="keperluan"
                name="keperluan"
                required
                placeholder=" "
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
              <label
                htmlFor="keperluan"
                className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all"
              >
                Keperluan
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
            <Link
              href="/DaftarTamu"
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition"
            >
              <FaArrowLeft className="text-yellow-500 mr-2" /> Kembali
            </Link>
            <button
              type="submit"
              id="submitButtonGuest"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg flex items-center transition"
            >
              <FaUserCheck className="mr-2" /> Tambah Tamu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahTamu;

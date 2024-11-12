"use client";

import {
  FaFilePdf,
  FaBookOpen,
  FaArrowLeft,
  FaTrash,
  FaSearch,
  FaSignInAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";

const DaftarRiwayat = () => {
  const [riwayatList, setRiwayatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRiwayatList, setFilteredRiwayatList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load data riwayat dari local storage saat komponen dimuat
  useEffect(() => {
    const storedRiwayatList =
      JSON.parse(localStorage.getItem("riwayatList")) || [];
    setRiwayatList(storedRiwayatList);
    setFilteredRiwayatList(storedRiwayatList);
  }, []);

  useEffect(() => {
    const results = riwayatList.filter(
      (riwayat) =>
        riwayat.namaTamu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        riwayat.idKamar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        riwayat.noTelepon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRiwayatList(results);
  }, [searchTerm, riwayatList]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fungsi untuk mencetak invoice
  const printRiwayat = () => {
    window.print();
  };

  // Fungsi untuk menghapus riwayat berdasarkan index
  const handleDelete = (id) => {
    const updatedRiwayatList = riwayatList.filter(
      (riwayat) => riwayat.id !== id
    );
    setRiwayatList(updatedRiwayatList);
    localStorage.setItem("riwayatList", JSON.stringify(updatedRiwayatList));
    alert("Hapus Data Riwayat Berhasil!");
    setFilteredRiwayatList(updatedRiwayatList);
  };

  // Fungsi untuk menghapus semua data riwayat
  const handleClearData = () => {
    localStorage.removeItem("riwayatList");
    setRiwayatList([]);
    alert("Hapus Seluruh Data Riwayat Berhasil!");
    setFilteredRiwayatList([]);
  };

  // Hitung indeks untuk item yang akan ditampilkan pada halaman saat ini
  const sortedRiwayatList = [...filteredRiwayatList].reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedRiwayatList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
        <FaBookOpen className="text-yellow-500 mr-2" />
        Daftar Riwayat
      </h2>

      <div className="mt-6 flex justify-between items-center text-sm mb-6">
        <Link
          href="/Dashboard"
          className="flex items-center text-md font-semibold text-gray-600 hover:text-yellow-500 transition"
        >
          <FaArrowLeft className="text-yellow-500 mr-2" />
          Kembali
        </Link>
        <button
          onClick={printRiwayat}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition"
        >
          <FaFilePdf className="mr-2" />
          Cetak PDF
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cari Berdasarkan Nama, ID Kamar, atau No Telepon"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pl-10 border rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Tabel Reservasi */}
      <div className="overflow-x-auto bg-white text-left shadow-lg rounded-lg">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">ID Kamar</th>
              <th className="px-4 py-2">Nama Tamu</th>
              <th className="px-4 py-2">No Telepon</th>
              <th className="px-4 py-2">Check-in</th>
              <th className="px-4 py-2">Check-out</th>
              <th className="px-4 py-2">Total Harga</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody id="riwayatTableBody">
            {currentItems.length > 0 ? (
              currentItems.map((riwayat, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-4 py-2">{riwayat.idKamar}</td>
                  <td className="border px-4 py-2">{riwayat.namaTamu}</td>
                  <td className="border px-4 py-2">{riwayat.noTelepon}</td>
                  <td className="border px-4 py-2">{riwayat.tanggalCheckIn}</td>
                  <td className="border px-4 py-2">
                    {riwayat.tanggalCheckOut}
                  </td>
                  <td className="border px-4 py-2">{riwayat.harga}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(riwayat.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 mx-1 py-1 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Tidak ada riwayat yang terdaftar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between my-6 mb-20">
        <div>
          <button
            onClick={handleClearData}
            className=" py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Clear Data
          </button>
        </div>
        <div>
          {Array.from(
            { length: Math.ceil(filteredRiwayatList.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 p-2 rounded ${
                  currentPage === index + 1
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default DaftarRiwayat;

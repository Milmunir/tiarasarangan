"use client";
import {
  FaUsers,
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DaftarTamu = () => {
  const router = useRouter();
  const [tamuList, setTamuList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTamuList, setFilteredTamuList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fungsi untuk mengambil data dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    setTamuList(storedTamuList);
    setFilteredTamuList(storedTamuList);
  }, []);

  useEffect(() => {
    const results = tamuList.filter(
      (tamu) =>
        tamu.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tamu.noHp.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTamuList(results);
  }, [searchTerm, tamuList]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fungsi untuk menghapus tamu berdasarkan id
  const handleDelete = (id) => {
    const updatedTamuList = tamuList.filter((tamu) => tamu.id !== id);
    setTamuList(updatedTamuList);
    localStorage.setItem("tamuList", JSON.stringify(updatedTamuList));
    alert("Hapus Data Tamu Berhasil!");
    setFilteredTamuList(updatedTamuList);
  };

  // Fungsi untuk clear semua data tamu
  const handleClearData = () => {
    localStorage.removeItem("tamuList");
    setTamuList([]);
    alert("Hapus Seluruh Data Tamu Berhasil!");
    setFilteredTamuList([]);
  };

  // Fungsi untuk navigasi ke halaman tambah tamu
  const handleAddGuest = () => {
    router.push("/TambahTamu");
  };

  // Hitung indeks untuk item yang akan ditampilkan pada halaman saat ini
  const sortedTamuList = [...filteredTamuList].reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedTamuList.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center">
        <FaUsers className="text-yellow-500 mr-2" />
        Daftar Tamu
      </h2>

      <div className="mt-6 flex justify-between items-center text-sm mb-6">
        <Link
          href="/Dashboard"
          className="flex items-center text-sm text-gray-600 hover:text-yellow-500 transition"
        >
          <FaArrowLeft className="text-yellow-500 mr-2" />
          Kembali
        </Link>
        <button
          onClick={handleAddGuest}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition"
        >
          <FaPlus className="mr-2" />
          Tambah Tamu
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cari Berdasarkan Nama atau No Telepon"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 pl-10 border rounded-md shadow-md focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <th className="px-4 py-2">No</th>
              <th className="px-6 py-2">Tanggal</th>
              <th className="px-6 py-2">Nama Tamu</th>
              <th className="px-6 py-2">No WA</th>
              <th className="px-6 py-2">Keperluan</th>
              <th className="px-6 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody id="tamuTableBody">
            {currentItems.length > 0 ? (
              currentItems.map((tamu, index) => (
                <tr key={tamu.id}>
                  <td className="border px-4 py-2">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-6 py-2">
                    {tamu.tanggal} {tamu.waktu}
                  </td>
                  <td className="border px-6 py-2">{tamu.namaLengkap}</td>
                  <td className="border px-6 py-2">{tamu.noHp}</td>
                  <td className="border px-6 py-2">{tamu.keperluan}</td>
                  <td className="border px-6 py-2">
                    <button
                      onClick={() => handleDelete(tamu.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Tidak ada tamu yang terdaftar
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
            { length: Math.ceil(filteredTamuList.length / itemsPerPage) },
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

export default DaftarTamu;

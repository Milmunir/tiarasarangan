"use client";

import {
  FaPlus,
  FaBookOpen,
  FaArrowLeft,
  FaTrash,
  FaSearch,
  FaSignInAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DaftarBooking = ( data ) => {
  // console.log(data.list);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const router = useRouter();
  const [bookingList, setBookingList] = useState([]);
  const [tamuList, setTamuList] = useState([]);
  const [checkInList, setCheckInList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookingList, setFilteredBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Load data tamu dari local storage saat komponen dimuat
  useEffect(() => {
    const storedBookingList =
      JSON.parse(localStorage.getItem("bookingList")) || [];
    const storedTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    const storedCheckInList =
      JSON.parse(localStorage.getItem("checkInList")) || [];

    setBookingList(storedBookingList);
    setTamuList(storedTamuList);
    setCheckInList(storedCheckInList);
    setFilteredBookingList(storedBookingList);
  }, []);

  useEffect(() => {
    const results = bookingList.filter(
      (booking) =>
        booking.namaTamu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.idKamar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.noTelepon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookingList(results);
  }, [searchTerm, bookingList]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fungsi untuk menghapus tamu berdasarkan index
  const handleDelete = (id) => {
    const updatedBookingList = bookingList.filter(
      (booking) => booking.id !== id
    );
    setBookingList(updatedBookingList);
    localStorage.setItem("bookingList", JSON.stringify(updatedBookingList));
    alert("Hapus Data Berhasil!");
    setFilteredBookingList(updatedBookingList);
  };

  // Fungsi untuk menghapus semua data booking
  const handleClearData = () => {
    localStorage.removeItem("bookingList");
    setBookingList([]);
    alert("Hapus Seluruh Data Booking Berhasil!");
    setFilteredBookingList([]);
  };

  // Fungsi untuk checkIn berdasarkan index
  const handleCheckInClick = (id) => {
    // Temukan booking yang cocok berdasarkan id
    const bookingToCheckIn = bookingList.find((booking) => booking.id === id);

    // Buat objek dengan status yang diperbarui
    const updatedBookingStatus = {
      ...bookingToCheckIn,
      statusBooking: "checkin",
      statusKamar: "checked",
    };

    // Filter bookingList untuk menghapus booking yang di-check-in
    const updatedBookingList = bookingList.filter(
      (booking) => booking.id !== id
    );

    // Tambahkan booking yang diperbarui ke checkInList
    const newCheckInList = [...checkInList, updatedBookingStatus];

    // Update state dengan daftar booking dan check-in yang baru
    setBookingList(updatedBookingList);
    setCheckInList(newCheckInList);

    // Simpan perubahan ke localStorage
    localStorage.setItem("bookingList", JSON.stringify(updatedBookingList));
    localStorage.setItem("checkInList", JSON.stringify(newCheckInList));

    // Data tamu baru untuk disimpan
    const newTamu = {
      id: Date.now(),
      namaLengkap: updatedBookingStatus.namaTamu,
      noHp: updatedBookingStatus.noTelepon,
      keperluan: "Check-in",
      tanggal: new Date().toLocaleDateString(),
      waktu: new Date().toLocaleTimeString(),
    };

    // Tambahkan data tamu baru ke daftar tamu di localStorage
    const existingTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    const updatedTamuList = [newTamu, ...existingTamuList];
    setTamuList(updatedTamuList);
    localStorage.setItem("tamuList", JSON.stringify(updatedTamuList));

    alert("Check-In Berhasil!");
    router.push("/DaftarCheckIn");
  };

  // Fungsi untuk navigasi ke halaman tambah tamu
  const handleAddGuest = () => {
    router.push("/TambahBooking");
  };

  // Hitung indeks untuk item yang akan ditampilkan pada halaman saat ini
  const sortedBookingList = [...filteredBookingList].reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookingList.slice(
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
        Daftar Boooking
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
          onClick={handleAddGuest}
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition"
        >
          <FaPlus className="mr-2" />
          Tambah Booking
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

      {/* Tabel booking */}
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
          <tbody id="bookTableBody">
            {data.list.length > 0 ? (
              data.list.map((booking, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {" "}
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="border px-4 py-2">{booking.id_ruangan}</td>
                  <td className="border px-4 py-2">{booking.nama}</td>
                  <td className="border px-4 py-2">{booking.hp}</td>
                  <td className="border px-4 py-2">{booking.masuk.toLocaleDateString('id-id', options)}</td>
                  <td className="border px-4 py-2">
                    {booking.keluar.toLocaleDateString('id-id', options)}
                  </td>
                  <td className="border px-4 py-2">{booking.dp}</td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-green-600 hover:bg-green-500 text-white px-2 mx-1 py-1 rounded-md"
                      onClick={() => handleCheckInClick(booking.id)}
                    >
                      <FaSignInAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
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
                  Tidak ada booking yang terdaftar
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
            { length: Math.ceil(filteredBookingList.length / itemsPerPage) },
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

export default DaftarBooking;

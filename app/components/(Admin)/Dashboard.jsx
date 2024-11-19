"use client";
import { FaBed, FaCalendar, FaUsers, FaStar } from "react-icons/fa";
import kamarList from "./TambahKamar";
import { useEffect, useContext } from "react";
import { DarkModeContext } from "@/app/(contexts)/DarkModeContext";

const DashboardAdmin = () => {
  const { isDarkMode } = useContext(DarkModeContext);
  useEffect(() => {
    // Konversi objek JSON ke string
    const jsonData = JSON.stringify(kamarList);
    // Simpan ke local storage dengan kunci "kamarList"
    localStorage.setItem("kamarList", jsonData);
    console.log(
      "Data telah disimpan ke local storage:",
      localStorage.getItem("kamarList")
    );
  }, []);

  return (
    <div
      className={`fixed left-0 top-16 bottom-10 right-0 md:left-64 pt-14 pb-6 md:pt-10 px-8 overflow-y-auto ${
        isDarkMode ? "dark" : ""
      }`}
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
        Selamat Datang di Dashboard Villa Tiara
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-yellow-500 text-white flex justify-center items-center rounded-full">
              <FaBed size={35} />
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">
                Kamar Tersedia
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                32
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-blue-500 text-white flex justify-center items-center rounded-full">
              <FaCalendar size={30} />
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">
                Kamar Terpakai
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                12
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-green-500 text-white flex justify-center items-center rounded-full">
              <FaUsers size={35} />
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">
                Tamu Terdaftar
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                150
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-red-500 text-white flex justify-center items-center rounded-full">
              <FaStar size={35} />
            </div>
            <div className="ml-4">
              <h3 className="text-md font-medium text-gray-600 dark:text-gray-300">
                Ulasan
              </h3>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                120
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Reservasi Terbaru
          </h3>
          <div className="overflow-x-auto bg-white dark:bg-gray-700 shadow-lg rounded-xl">
            <table className="min-w-full bg-white dark:bg-gray-700">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-300 dark:bg-gray-800 text-left text-black dark:text-gray-200">
                    Nama
                  </th>
                  <th className="py-2 px-4 bg-gray-300 dark:bg-gray-800 text-left text-black dark:text-gray-200">
                    Tipe Kamar
                  </th>
                  <th className="py-2 px-4 bg-gray-300 dark:bg-gray-800 text-left text-black dark:text-gray-200">
                    Tanggal
                  </th>
                  <th className="py-2 px-4 bg-gray-300 dark:bg-gray-800 text-left text-black dark:text-gray-200">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    John Doe
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    Deluxe
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    11 Okt 2024
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-green-500 dark:text-green-400">
                    Dikonfirmasi
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    Jane Smith
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    Suite
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    10 Okt 2024
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-yellow-500 dark:text-yellow-400">
                    Menunggu
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    Richard Roe
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    Standard
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 dark:text-gray-200">
                    9 Okt 2024
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-600 text-red-500 dark:text-red-400">
                    Dibatalkan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 col-span-1 p-4 rounded-xl">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Pengumuman
          </h3>
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg">
            <div className="py-4 px-5 dark:text-gray-200">
              <p className="mb-2">
                Libur Nasional{" "}
                <span className="text-white bg-red-500 text-xs px-3 py-1 rounded-2xl mb-5">
                  Penting
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Oleh: Nama Syahrul - 2022-03-02 00:00
              </p>
            </div>
            <div className="py-4 px-5 dark:text-gray-200">
              <p className="mb-2">
                Libur Nasional{" "}
                <span className="text-white bg-yellow-500 text-xs px-3 py-1 rounded-2xl mb-5">
                  Penting
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Oleh: Nama Syahrul - 2022-03-02 00:00
              </p>
            </div>
            <div className="py-4 px-5 dark:text-gray-200">
              <p className="mb-2">
                Libur Nasional{" "}
                <span className="text-white bg-red-500 text-xs px-3 py-1 rounded-2xl mb-5">
                  Penting
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Oleh: Nama Syahrul - 2022-03-02 00:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;

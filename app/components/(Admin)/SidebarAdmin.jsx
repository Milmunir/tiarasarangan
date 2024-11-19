"use client";

import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaBook,
  FaFileAlt,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const SidebarAdmin = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [dropdowns, setDropdowns] = useState({
    reservasi: false,
    bukutamu: false,
    laporan: false,
  });

  // Fungsi untuk toggle menu mobile
  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const toggleDropdown = (menu) => {
    setDropdowns((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("id-ID", options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <>
      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 w-64 bg-red-700 text-white h-screen transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-20 overflow-auto`}
      >
        <h1 className="logo text-4xl font-bold py-6 text-center">
          Villa Tiara
        </h1>
        <div className="flex items-center justify-center mx-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 shadow-lg rounded-lg">
          <div className="flex-shrink-0">
            <Image
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              className="w-10 h-10 rounded-full border-2 border-white"
              alt="Admin"
              width={40}
              height={40}
            />
          </div>
          <div className="ml-3 text-white">
            <p className="text-md font-bold">ADMIN</p>
            <p className="text-xs opacity-85">{currentDate}</p>
          </div>
        </div>

        <nav>
          <ul className="py-5">
            <li className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
              <Link href="/Dashboard" passHref legacyBehavior>
                <a className="flex items-center px-2 text-gray-300 hover:text-white rounded-md">
                  <FaTachometerAlt className="w-6 h-6" />
                  <span className="ml-3 font-medium">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
              <button
                className="w-full flex items-center px-2 text-gray-300 hover:text-white rounded-md focus:outline-none"
                onClick={() => toggleDropdown("reservasi")}
              >
                <FaCalendarAlt className="w-6 h-6" />
                <span className="ml-3 font-medium">Reservasi</span>
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${
                    dropdowns.reservasi ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <ul
                id="reservasi-menu"
                className={`list-disc ml-14 mt-4 space-y-2 pb-2 transition-all duration-300 ease-in-out transform ${
                  dropdowns.reservasi ? "" : "hidden"
                }`}
              >
                <li>
                  <Link href="/TambahBooking" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Tambah Booking
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/DaftarBooking" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Daftar Booking
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/DaftarCheckIn" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Daftar CheckIn
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/DaftarRiwayat" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Daftar Riwayat
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
              <button
                className="w-full flex items-center px-2 text-gray-300 hover:text-white rounded-md focus:outline-none"
                onClick={() => toggleDropdown("bukutamu")}
              >
                <FaBook className="w-6 h-6" />
                <span className="ml-3 font-medium">Buku Tamu</span>
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${
                    dropdowns.bukutamu ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <ul
                id="bukutamu-menu"
                className={`list-disc ml-14 mt-4 space-y-2 pb-2 transition-all duration-300 ease-in-out transform ${
                  dropdowns.bukutamu ? "" : "hidden"
                }`}
              >
                <li>
                  <Link href="/TambahTamu" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Tambah Tamu
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/DaftarTamu" passHref legacyBehavior>
                    <a className="text-gray-300 hover:text-white">
                      Daftar Tamu
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
              <button
                className="w-full flex items-center px-2 text-gray-300 hover:text-white rounded-md focus:outline-none"
                onClick={() => toggleDropdown("laporan")}
              >
                <FaFileAlt className="w-6 h-6" />
                <span className="ml-3 font-medium">Laporan</span>
                <FaChevronDown
                  className={`ml-auto w-4 h-4 transform transition-transform duration-300 ${
                    dropdowns.laporan ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              <ul
                id="laporan-menu"
                className={`list-disc ml-14 mt-4 space-y-2 pb-2 transition-all duration-300 ease-in-out transform ${
                  dropdowns.laporan ? "" : "hidden"
                }`}
              >
                <li>?</li>
                <li>?</li>
              </ul>
            </li>
            <li className="px-6 py-4 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-500">
              <Link href="/Login" passHref legacyBehavior>
                <a className="flex items-center px-2 text-gray-300 hover:text-white rounded-md">
                  <FaSignOutAlt className="w-6 h-6" />
                  <span className="ml-3 font-medium">Logout</span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <nav className="fixed md:hidden p-4 top-0 left-0 right-0 bg-gradient-to-br from-red-700 to-orange-700 flex justify-between items-center z-50">
        <div className="logo text-white px-4 text-2xl font-bold">
          Villa Tiara
        </div>
        <button
          id="menu-toggle"
          onClick={handleMenuToggle}
          className="text-2xl text-white p-2 rounded-md focus:outline-none"
        >
          ☰
        </button>
      </nav>
    </>
  );
};

export default SidebarAdmin;

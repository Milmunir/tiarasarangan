"use client";

import React, { useContext } from "react";
import { FaSearch, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { DarkModeContext } from "@/app/(contexts)/DarkModeContext";

const NavbarAdmin = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const toggleSidebar = () => {
    alert("Sidebar toggle clicked");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-30 md:left-60 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-400">
      <div className="flex justify-between items-center h-16 mx-10">
        <div className="flex items-center">
          <button
            className="text-2xl text-gray-600 dark:text-gray-200 md:hidden"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            &#9776;
          </button>

          <div className="hidden md:flex items-center">
            <FaSearch className="text-gray-500 dark:text-gray-400 mr-4" />
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-1.5 border border-gray-300 dark:border-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell className="text-gray-600 dark:text-gray-200 text-xl" />
            <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          </div>

          <button
            className="text-xl text-gray-600 dark:text-gray-200 focus:outline-none"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button className="flex items-center bg-blue-600 text-white dark:bg-blue-700 dark:text-gray-100 px-3 py-1.5 rounded-full focus:outline-none">
            <FaUserCircle className="text-lg mr-2" />
            <span>Admin</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;

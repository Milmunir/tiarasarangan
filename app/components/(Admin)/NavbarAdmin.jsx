"use client";

import React, { useContext, useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { DarkModeContext } from "@/app/(contexts)/DarkModeContext";
import SidebarAdmin from "./SidebarAdmin"; // Pastikan path import benar

const NavbarAdmin = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const sidebarRef = useRef(null);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-30 md:left-60 border-b-2 border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-400">
        <div className="flex justify-between items-center h-16 mx-6">
          <div className="flex items-center">
            <button
              className="text-3xl text-gray-600 dark:text-gray-200 md:hidden"
              id="menu-toggle"
              onClick={handleMenuToggle}
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
              onClick={handleFullScreen}
              aria-label="Toggle Full Screen"
            >
              {isFullScreen ? <FaCompress /> : <FaExpand />}
            </button>

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
      <SidebarAdmin isOpen={isMobileMenuOpen} ref={sidebarRef} />
    </>
  );
};

export default NavbarAdmin;

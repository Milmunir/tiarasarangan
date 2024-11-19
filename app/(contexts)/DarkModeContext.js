"use client";

import React, { createContext, useState, useEffect } from "react";

// Membuat context
export const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Memeriksa dan menerapkan mode gelap yang disimpan di localStorage
    const savedDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));
    if (savedDarkMode !== null) {
      setIsDarkMode(savedDarkMode);
      if (savedDarkMode) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      // Simpan status mode gelap di localStorage
      localStorage.setItem("isDarkMode", JSON.stringify(newMode));
      return newMode;
    });
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

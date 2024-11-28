"use client";
import React, { createContext, useState, useEffect } from "react";

// Membuat context
export const FullScreenContext = createContext();

// Provider untuk menyediakan konteks full screen
export const FullScreenProvider = ({ children }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // Memeriksa dan menerapkan status layar penuh yang disimpan di localStorage
    const savedFullScreen = JSON.parse(localStorage.getItem("isFullScreen"));
    if (savedFullScreen !== null) {
      setIsFullScreen(savedFullScreen);
      if (savedFullScreen && !document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
          );
        });
      }
    }

    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      localStorage.setItem(
        "isFullScreen",
        JSON.stringify(!!document.fullscreenElement)
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
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

  return (
    <FullScreenContext.Provider value={{ isFullScreen, toggleFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};

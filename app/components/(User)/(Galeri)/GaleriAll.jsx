"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { motion } from "framer-motion";

const GaleriAllComponent = () => {
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    // Ambil data gambar dari localStorage
    const storedGallery = localStorage.getItem("galeriList");
    if (storedGallery) {
      try {
        const parsedGallery = JSON.parse(storedGallery);
        if (Array.isArray(parsedGallery)) {
          setGallery(parsedGallery);
        } else {
          setGallery([]);
        }
      } catch (error) {
        console.error("Error parsing gallery data:", error);
        setGallery([]);
      }
    }
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-12 md:px-20 mt-16 md:mt-24">
        {/* Title Section */}
        <section className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Semua <span className="text-red-600">Galeri</span>
          </h1>
        </section>

        {/* Gallery Section */}
        <PhotoProvider>
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:mx-10 md:mx-2 lg:mx-10"
          >
            {gallery.map((image, index) => (
              <PhotoView key={index} src={image}>
                <motion.div className="relative group overflow-hidden rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Image
                    className="w-full h-full object-cover"
                    src={image}
                    alt={`Gallery Image ${index + 1}`}
                    width={800}
                    height={533}
                    loading="lazy"
                    layout="responsive"
                  />
                  <div className="absolute inset-0 bg-black via-transparent opacity-0 group-hover:opacity-70 flex items-center justify-center transition-opacity duration-300 pointer">
                    <span className="text-white text-md font-semibold">
                      Klik untuk memperbesar
                    </span>
                  </div>
                </motion.div>
              </PhotoView>
            ))}
          </motion.section>
        </PhotoProvider>
      </div>
    </div>
  );
};

export default GaleriAllComponent;

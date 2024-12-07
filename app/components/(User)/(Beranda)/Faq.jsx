"use client";

import React, { useState } from "react";

const FaqComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="container py-16 mx-auto px-10 md:px-20">
        <section className="text-center mb-4">
          <h1 className="text-3xl md:text-5xl font-extrabold">
            Pertanyaan <span className="text-red-600">Sering Diajukan</span>
          </h1>
          <p className="text-gray-700 text-md py-6">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang Villa
            Tiara Sarangan
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left p-4 font-semibold flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(1)}
            >
              <span>
                Fasilitas apa saja yang tersedia di Villa Tiara Sarangan?
              </span>
              <span className="toggle-icon" id="toggle-icon-1">
                {activeIndex === 1 ? "-" : "+"}
              </span>
            </button>
            {activeIndex === 1 && (
              <div className="p-4">
                <p className="text-gray-600">
                  Villa Tiara Sarangan menyediakan berbagai fasilitas termasuk
                  resepsionis 24 jam, area parkir luas, restoran dengan menu
                  lezat, Café Tiara, meeting room yang modern, serta akses Wi-Fi
                  gratis di seluruh area. Dengan fasilitas lengkap ini,
                  pengunjung dijamin merasa nyaman dan puas selama menginap.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left p-4 font-semibold flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(2)}
            >
              <span>
                Kapan waktu check-in & check-out di Villa Tiara Sarangan?
              </span>
              <span className="toggle-icon" id="toggle-icon-2">
                {activeIndex === 2 ? "-" : "+"}
              </span>
            </button>
            {activeIndex === 2 && (
              <div className="p-4">
                <p className="text-gray-600">
                  Waktu check-in di Villa Tiara Sarangan dimulai pukul 14.00
                  WIB. Sementara itu, waktu check-out adalah sebelum pukul 12.00
                  WIB.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left p-4 font-semibold flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(3)}
            >
              <span>
                Tempat wisata apa saja yang dekat dengan Villa Tiara Sarangan?
              </span>
              <span className="toggle-icon" id="toggle-icon-3">
                {activeIndex === 3 ? "-" : "+"}
              </span>
            </button>
            {activeIndex === 3 && (
              <div className="p-4">
                <p className="text-gray-600">
                  Villa Tiara Sarangan memiliki lokasi yang strategis dengan
                  berbagai tempat wisata menarik di sekitarnya. Seperti Telaga
                  Sarangan, Mojosemi Forest Park, Air Terjun Ngadiloyo, dan
                  Kebun Strawberry Sarangan. Hebatnya lagi, Telaga Sarangan
                  hanya berjarak sekitar 10 meter dari villa, sehingga
                  pengunjung hanya tinggal berjalan kaki untuk ke Telaga
                  Sarangan.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg">
            <button
              className="w-full text-left p-4 font-semibold flex justify-between items-center focus:outline-none"
              onClick={() => toggleAccordion(4)}
            >
              <span>
                Berapa biaya untuk sewa kamar per malamnya di Villa Tiara
                Sarangan?
              </span>
              <span className="toggle-icon" id="toggle-icon-4">
                {activeIndex === 4 ? "-" : "+"}
              </span>
            </button>
            {activeIndex === 4 && (
              <div className="p-4">
                <p className="text-gray-600">
                  Untuk informasi harga kamar di Villa Tiara Sarangan, Anda
                  dapat langsung menghubungi kontak resmi melalui WhatsApp Villa
                  Tiara Sarangan di
                  <a
                    href="https://wa.me/6281335623403"
                    className="whatsapp-logo"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +6281335623403
                  </a>
                  . Kami menyediakan berbagai tipe kamar dengan harga terjangkau
                  yang cocok untuk keluarga, pasangan, maupun rombongan.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FaqComponent;

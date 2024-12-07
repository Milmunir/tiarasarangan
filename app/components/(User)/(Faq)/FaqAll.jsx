"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";

const FaqAllComponent = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Fasilitas apa saja yang tersedia di Villa Tiara Sarangan?",
      answer:
        "Villa Tiara Sarangan menyediakan berbagai fasilitas termasuk resepsionis 24 jam, area parkir luas, restoran dengan menu lezat, Café Tiara, meeting room yang modern, serta akses Wi-Fi gratis di seluruh area. Dengan fasilitas lengkap ini, pengunjung dijamin merasa nyaman dan puas selama menginap.",
    },
    {
      question: "Kapan waktu check-in & check-out di Villa Tiara Sarangan?",
      answer:
        "Waktu check-in di Villa Tiara Sarangan dimulai pukul 14.00 WIB. Sementara itu, waktu check-out adalah sebelum pukul 12.00 WIB.",
    },
    {
      question:
        "Tempat wisata apa saja yang dekat dengan Villa Tiara Sarangan?",
      answer:
        "Villa Tiara Sarangan memiliki lokasi yang strategis dengan berbagai tempat wisata menarik di sekitarnya. Seperti Telaga Sarangan, Mojosemi Forest Park, Air Terjun Ngadiloyo, dan Kebun Strawberry Sarangan. Hebatnya lagi, Telaga Sarangan hanya berjarak sekitar 10 meter dari villa, sehingga pengunjung hanya tinggal berjalan kaki untuk ke Telaga Sarangan.",
    },
    {
      question:
        "Berapa biaya untuk sewa kamar per malamnya di Villa Tiara Sarangan?",
      answer:
        "Untuk informasi harga kamar di Villa Tiara Sarangan, Anda dapat langsung menghubungi kontak resmi melalui WhatsApp Villa Tiara Sarangan di +6281335623403. Kami menyediakan berbagai tipe kamar dengan harga terjangkau yang cocok untuk keluarga, pasangan, maupun rombongan.",
    },
  ];

  return (
    <section className="faq-section space-y-6">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="faq-item border border-gray-300 rounded-xl shadow-md overflow-hidden transition-all duration-300"
        >
          <button
            className="faq-question w-full text-left px-6 py-4 font-semibold flex justify-between items-center bg-gray-50 hover:bg-gray-100 focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex items-center">
              <FaQuestionCircle className="text-red-500 text-xl mr-4" />
              <span>{faq.question}</span>
            </div>
            {activeIndex === index ? (
              <FaChevronUp className="text-red-500 text-xl" />
            ) : (
              <FaChevronDown className="text-gray-500 text-xl" />
            )}
          </button>
          {activeIndex === index && (
            <div className="faq-answer px-6 py-4 bg-white text-gray-700 border-t border-gray-200">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default FaqAllComponent;

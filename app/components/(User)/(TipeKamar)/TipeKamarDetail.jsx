"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  FaConciergeBell,
  FaParking,
  FaUtensils,
  FaCoffee,
  FaWifi,
  FaBed,
} from "react-icons/fa";
import Standart from "@/public/Standart.JPG";
import Family from "@/public/Family.JPG";
import Deluxe from "@/public/Deluxe.JPG";
import Image from "next/image";

const TipeKamarDetailComponent = () => {
  const rooms = [
    {
      type: "standart",
      title: "Kamar Standar",
      image: Standart,
      bedDescription: "1 Double Bed & 1 Sliding Bed",
    },
    {
      type: "family",
      title: "Kamar Family",
      image: Family,
      bedDescription: "1 Double Bed & 1 Single Bed",
    },
    {
      type: "deluxe",
      title: "Kamar Deluxe",
      image: Deluxe,
      bedDescription: "2 Double Beds",
    },
  ];

  // Data fasilitas umum
  const facilities = [
    { icon: <FaWifi />, text: "Wi-Fi Gratis" },
    { icon: <FaCoffee />, text: "Pembuat Kopi/Teh" },
    { icon: <FaConciergeBell />, text: "Layanan Kamar 24 Jam" },
    { icon: <FaParking />, text: "Parkir Gratis" },
    { icon: <FaUtensils />, text: "Sarapan Gratis" },
  ];

  const [visibleSections, setVisibleSections] = useState({});
  const observer = useRef();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.current.observe(el));

    return () => observer.current.disconnect();
  }, []);

  return (
    <div>
      {rooms.map((room, index) => (
        <section
          key={index}
          id={room.type}
          className={`fade-in ${
            visibleSections[room.type] ? "fade-in-visible" : ""
          } bg-white rounded-2xl shadow-lg p-10 mb-10`}
        >
          <h2 className="text-3xl text-center md:text-justify font-extrabold mb-6 text-red-600">
            {room.title}
          </h2>
          <div className="flex flex-col items-start md:flex-row">
            <Image
              src={room.image}
              alt={room.title}
              loading="lazy"
              className="w-full md:w-4/6 lg:w-3/5 rounded-xl md:rounded-3xl mb-6 md:mb-0 mr-10 lg:mr-12"
            />
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                Fasilitas
              </h3>
              <ul className="list-none space-y-2 lg:space-y-4">
                {/* Bed Description */}
                <li className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300">
                  <div className="text-2xl text-red-500 mr-3">
                    <FaBed />
                  </div>
                  {room.bedDescription}
                </li>
                {/* General Facilities */}
                {facilities.map((facility, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-600 hover:text-red-600 transition-colors duration-300"
                  >
                    <div className="text-2xl text-red-500 mr-3">
                      {facility.icon}
                    </div>
                    {facility.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default TipeKamarDetailComponent;

"use client";
import React from "react";

const TipeKamarAllComponent = () => {
  // Data untuk kamar
  const rooms = [
    {
      type: "standart",
      title: "Kamar Standar",
    },
    {
      type: "family",
      title: "Kamar Family",
    },
    {
      type: "deluxe",
      title: "Kamar Deluxe",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 text-md gap-6 my-6 font-extrabold">
      {rooms.map((room, index) => (
        <div
          key={index}
          className="flex flex-col text-center text-gray-800 hover:text-white justify-center items-center bg-white hover:bg-red-600 border-4 border-gray-300 py-6 rounded-xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => {
            // Scroll ke section sesuai id
            document.getElementById(room.type)?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <h1 className="text-xl font-extrabold">{room.title}</h1>
        </div>
      ))}
    </section>
  );
};

export default TipeKamarAllComponent;

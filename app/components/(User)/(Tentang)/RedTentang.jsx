import React from "react";
import { FaInstagram, FaTwitter, FaTiktok, FaYoutube } from "react-icons/fa";

const RedTentangComponent = () => {
  return (
    <section className="hero-section relative text-center bg-cover bg-center rounded-2xl overflow-hidden shadow-xl mb-12">
      <div className="bg-red-600 px-10 md:px-40 py-10 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-shadow-xl">
          Tentang Villa
        </h1>
        <p className="text-sm md:text-md font-light mb-4 text-shadow-md">
          Villa Tiara Sarangan adalah penginapan strategis dekat destinasi
          wisata populer Telaga Sarangan di Magetan, Jawa Timur. Dengan
          fasilitas lengkap dan harga terjangkau, villa ini cocok untuk agenda
          liburan Anda bersama keluarga.
        </p>
        <div className="flex justify-center mt-6 space-x-4">
          <a
            href="https://instagram.com/villatiara.sarangan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-lg text-white hover:text-yellow-400 cursor-pointer" />
          </a>
          <a
            href="https://twitter.com/villatiara_sarangan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-lg text-white hover:text-yellow-400 cursor-pointer" />
          </a>
          <a
            href="https://tiktok.com/@villatiarasarangan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok className="text-lg text-white hover:text-yellow-400 cursor-pointer" />
          </a>
          <a
            href="https://youtube.com/@villatiarasarangan9576"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-lg text-white hover:text-yellow-400 cursor-pointer" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RedTentangComponent;

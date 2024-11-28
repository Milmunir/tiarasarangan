"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Glide from "@glidejs/glide";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from "react-icons/fa";
import models1 from "@/public/models1.png";
import models2 from "@/public/models2.png";
import models3 from "@/public/models3.png";

const testimonials = [
  {
    avatar: models1,
    name: "Nurul Halimah",
    type: "Deluxe",
    rating: "9.0",
    date: "02 Feb 2023",
    review:
      "Kamar yang nyaman dan fasilitas yang lengkap. Pelayanan sangat ramah dan membantu. Sangat puas menginap di sini!",
    likes: 25,
  },
  {
    avatar: models2,
    name: "Baihaqi Rusdi",
    type: "Family",
    rating: "8.8",
    date: "15 Mar 2024",
    review:
      "Lokasi strategis dan pemandangan indah. Kamar bersih dan luas, cocok untuk keluarga. Anak-anak sangat menikmati!",
    likes: 30,
  },
  {
    avatar: models3,
    name: "Ulil Ardian",
    type: "Standar",
    rating: "9.2",
    date: "05 Apr 2024",
    review:
      "Tempat yang sempurna untuk perjalanan bisnis. WiFi cepat dan fasilitas meeting room sangat baik. Akan kembali lagi!",
    likes: 45,
  },
];

const TestimoniComponent = () => {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      perView: 1,
      focusAt: "center",
      gap: 0,
      autoplay: 5000,
    });

    glide.mount();

    return () => glide.destroy();
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-6 md:px-12">
        {/* Title Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Testimoni <span className="text-red-600">Tamu</span>
          </h2>
          <p className="text-lg text-gray-600 mt-4">
            Temukan pengalaman tamu kami di Villa Tiara Sarangan.
          </p>
        </section>

        {/* Testimonials Section */}
        <div className="glide">
          <div
            className="glide__track rounded-3xl shadow-xl"
            data-glide-el="track"
          >
            <ul className="glide__slides rounded-3xl bg-white items-center flex justify-center">
              {testimonials.map((testimonial, index) => (
                <li
                  className="glide__slide py-10 flex px-36 items-center justify-center"
                  key={index}
                >
                  {/* Avatar Section */}
                  <div className="w-52 h-52 flex items-center justify-center bg-gray-100 rounded-full">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.type}
                      className="rounded-full transform group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 rounded-xl ml-10">
                    <div className="flex justify-between items-start rounded-xl">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.type}
                        </p>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        {[...Array(5)].map((_, starIndex) => (
                          <FaStar
                            key={starIndex}
                            className={
                              starIndex < Math.round(testimonial.rating / 2)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">
                          {testimonial.rating}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 italic mt-4 mb-6 text-lg">
                      &quot;{testimonial.review}&quot;
                    </p>

                    <div className="flex justify-between items-center text-sm text-gray-500 rounded-xl">
                      <span>{testimonial.date}</span>
                      <div className="flex items-center">
                        <FaHeart className="text-red-600 mr-1" />
                        {testimonial.likes}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation Arrows */}
          <div
            className="glide__arrows flex justify-between mt-6"
            data-glide-el="controls"
          >
            <button
              className="glide__arrow glide__arrow--left bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg"
              data-glide-dir="<"
            >
              <FaChevronLeft className="text-gray-600 text-xl" />
            </button>
            <button
              className="glide__arrow glide__arrow--right bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-lg"
              data-glide-dir=">"
            >
              <FaChevronRight className="text-gray-600 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimoniComponent;

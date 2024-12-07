"use client";
import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";

const ArtikelDetailComponent = () => {
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (id) {
      // Ambil data artikel dari localStorage
      const storedArticle = localStorage.getItem("artikelList");
      if (storedArticle) {
        const article = JSON.parse(storedArticle);
        const foundArticle = article.find(
          (article) => article.id === parseInt(id)
        );
        setArticle(foundArticle);
      }
    }
  }, [id]);

  useEffect(() => {
    // Ambil data artikel dari localStorage
    const storedArticles = localStorage.getItem("artikelList");
    if (storedArticles) {
      const parsedArticles = JSON.parse(storedArticles);

      // Balikkan urutan artikel terlebih dahulu, lalu ambil 4 artikel teratas
      const reversedArticles = parsedArticles.reverse();
      setArticles(reversedArticles.slice(0, 4));
    }
  }, []);

  const truncateText = (text, limit) => {
    const words = text.split(" ");
    return words.length > limit
      ? words.slice(0, limit).join(" ") + "..."
      : text;
  };

  if (!article) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="mt-16 md:mt-24 grid md:grid-cols-4 md:gap-4 px-4 md:px-20">
      <div className="container md:col-span-3 mx-auto pt-14 pb-10">
        {/* Tombol Back */}
        <button
          onClick={() => router.push("/Artikel")}
          className="mb-8 px-4 py-2 text-sm font-semibold text-white flex justify-center items-center bg-red-500 rounded hover:bg-yellow-600 transition duration-300"
        >
          <FaAngleLeft className="mr-2" /> Kembali
        </button>

        {/* Detail Artikel */}
        <div className="bg-white rounded-xl shadow-lg px-10 py-14 overflow-hidden">
          {/* Judul Artikel */}
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 my-4 text-center">
              {article.title}
            </h1>
          </div>

          {/* Gambar Artikel */}
          <div className="py-6">
            <Image
              src={article.src}
              alt={article.title}
              width={800}
              height={450}
              loading="lazy"
              layout="responsive"
              className="rounded-xl md:rounded-2xl object-cover"
            />
          </div>

          {/* Tanggal Artikel */}
          <div>
            <p className="text-gray-500 text-sm text-center">
              Diterbitkan pada{" "}
              <span className="font-semibold">{article.date}</span>
            </p>
          </div>

          {/* Konten Artikel */}
          <div className="py-6">
            <div
              className="text-gray-700 leading-relaxed text-justify"
              dangerouslySetInnerHTML={{ __html: article.content }}
            ></div>
          </div>

          {/* Tag Artikel */}
          {article.tags && article.tags.length > 0 && (
            <div className="pb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Tags:
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-md bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Read More */}
          {article.readmore && (
            <div className="text-md text-start">
              <p>
                Baca Juga:{" "}
                <Link
                  className="text-blue-600"
                  href={`/Artikel/${article.readmore}`}
                >
                  {article.readmoreTitle}
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 py-32 hidden md:inline">
        <div className="bg-red-500 font-bold text-lg text-center text-white py-4 mb-4 rounded-lg">
          <h1>Artikel Terbaru</h1>
        </div>
        {/* Articles Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="grid grid-cols-1 gap-4"
        >
          {articles.length > 0 ? (
            articles.map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden group"
              >
                <div className="w-full h-40 overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={article.src}
                    alt={`Blog ${article.id}`}
                    width={500}
                    height={300}
                    layout="responsive"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition duration-300">
                    {truncateText(article.title, 8)}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 mb-4">
                    {article.date}
                  </p>
                  <Link
                    href={`/Artikel/${article.id}`}
                    className="inline-flex items-center py-2 px-4 border-2 border-gray-300 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
                  >
                    Baca Selengkapnya <FaAngleRight className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-4">
              Tidak ada artikel untuk ditampilkan.
            </p>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default ArtikelDetailComponent;

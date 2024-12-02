import React from "react";
import Image from "next/image";

const sections = [
  {
    title: "TELAGA SARANGAN",
    caption: "Pemandangan Indah Telaga Sarangan",
    caption2:
      "Nikmati keindahan Telaga Sarangan dengan udara yang sejuk, tempat yang sempurna untuk melepas penat dan menikmati alam bersama keluarga, kerabat maupun pasangan.",
    img: "https://img.inews.co.id/media/1200/files/inews_new/2019/08/29/Sarangan.jpg",
  },
  {
    title: "BALKON & MEET ROOM",
    caption: "Ruang Nyaman untuk Pertemuan ",
    caption2:
      "Ruang pertemuan nyaman dengan pemandangan indah Telaga Sarangan, ideal untuk meeting, ngobrol santai, bekerja, atau berkumpul bersama keluarga, kerabat, hingga rekan kerja.",
    img: "https://content.skyscnr.com/available/1450394671/1450394671_WxH.jpg",
  },
  {
    title: "TIARA CAFÉ",
    caption: "Tempat Bersantai & Menikmati Hidangan",
    caption2:
      "Cafe Tiara menghadirkan kenyamanan dengan pemandangan indah sekitar Telaga Sarangan, tempat terbaik untuk bersantai sambil menikmati hidangan lezat dengan harga terjangkau",
    img: "https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/10011479-9e1d7420b3c3b1187f707d713260c357.jpeg",
  },
];

function HighlightComponent() {
  return (
    <div className="container atas relative bg-red-600 mx-auto py-10 px-4 mb-10 rounded-4xl shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
        {sections.map((section, index) => (
          <div key={index} className="flip-card">
            <div className="flip-card-inner">
              {/* Sisi Depan */}
              <div className="flip-card-front rounded-3xl relative border-4">
                <Image
                  src={section.img}
                  alt={section.title}
                  width={800}
                  height={500}
                  className="w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent rounded-3xl">
                  <div className="absolute inset-8 items-center justify-center">
                    <h2 className="text-white text-center text-xl font-extrabold">
                      {section.title}
                    </h2>
                    <p className="text-white text-center text-sm font-normal">
                      {section.caption}
                    </p>
                  </div>
                </div>
              </div>
              {/* Sisi Belakang */}
              <div className="flip-card-back rounded-3xl flex items-center justify-center px-14">
                <div className="text-center">
                  <h2 className="text-xl font-extrabold mb-3 text-white">
                    {section.title}
                  </h2>
                  <p className="text-white">{section.caption2}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightComponent;

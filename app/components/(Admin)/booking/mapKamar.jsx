import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MapKamar(data) {

  const today = new Date().toISOString().split('T')[0];
  const booked = new Map(data.booked.map(item => [item.id_ruangan, item]));

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <Link href="/Dashboard" className="flex items-center text-sm font-semibold text-gray-600 hover:text-yellow-500 transition" >
          <FaArrowLeft className="text-yellow-500 mr-2" />
          Kembali
        </Link>
        <input
          type="date"
          id="selectedDate"
          className="text-sm px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300 ease-in-out"
          defaultValue={today}
          onChange={(e) => data.changeTanggal(e.target.value)}
          style={{ width: "115px" }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="logo bg-gradient-to-br from-orange-500 to-red-500 text-white text-md rounded-lg p-2 mb-4 text-center font-bold">
            Villa Tiara 2
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-4 gap-2 text-sm">
            {data.room.map((kamar) => (
              kamar.villa == 2 &&
              <label key={kamar.id} className="select-none">
                <input type="checkbox" name="id_ruangan" id="id_ruangan" value={kamar.id} form="bookingForm" className="hidden peer" onChange={() => data.clicked(kamar)} disabled={booked.has(kamar.id)} data-harga={kamar.harga} />
                <div
                  className={`text-center p-2 border-2 rounded-lg cursor-pointer peer-checked:bg-red-700 ${booked.has(kamar.id)
                    ? "bg-green-600 text-white" // Warna hijau untuk kamar terisi
                    : "bg-yellow-50 border-yellow-500 hover:border-orange-700"
                    }`}
                >
                  <h3 className="font-semibold">{kamar.nomor}</h3>
                </div>
              </label>
            ))}

          </div>
        </div>
        <div>
          <h2 className="logo bg-gradient-to-br from-orange-500 to-red-500 text-white text-md rounded-lg p-2 mb-4 text-center font-bold">
            Villa Tiara 1
          </h2>
          <div className="grid grid-cols-5 md:grid-cols-4 gap-2 text-sm">
            {data.room.map((kamar) => (
              kamar.villa == 1 &&
              <label key={kamar.id} className="select-none">
                <input type="checkbox" name="id_ruangan" id="id_ruangan" value={kamar.id} form="bookingForm" className="hidden peer" onChange={() => data.clicked(kamar)} disabled={booked.has(kamar.id)} data-harga={kamar.harga}/>
                <div
                  className={`text-center p-2 border-2 rounded-lg cursor-pointer peer-checked:bg-red-700 ${booked.has(kamar.id)
                    ? "bg-green-600 text-white" // Warna hijau untuk kamar terisi
                    : "bg-yellow-50 border-yellow-500 hover:border-orange-700"
                    }`}
                >
                  <h3 className="font-semibold">{kamar.nomor}</h3>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
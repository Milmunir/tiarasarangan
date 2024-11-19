"use client";

import { useState, useEffect } from "react";
import { FaHotel, FaBed, FaDollarSign, FaTags } from "react-icons/fa";
import MapKamar from "./booking/mapKamar";
import FormBooking from "./booking/formBooking";

const TambahBooking = (data) => {
  const tipe = ["-", "1 Bed, 2-4 Orang", "2 Bed, 3 Orang", "2 Bed, 4 Orang"];
  const initial = {
    id: 0,
    tipe: 0,
    harga: 0,
  }
  const todayDate = new Date();
  const [booked, setbooked] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("-");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  // Memperbarui daftar kamar setiap kali tanggal yang dipilih berubah
  useEffect(() => {
    console.log('hehehe - ');
    const newdata = async () => {
      const updatedData = await data.getByDate(selectedDate);
      console.log(updatedData);
      setbooked(updatedData);
      document.getElementsByName("id_ruangan").forEach((input) => (input.checked = false));
    }
    newdata();
  }, [selectedDate, data]);
  
  // Fungsi untuk menangani klik pada tombol kamar
  const handleRoomClick = (kamar) => {
    if (kamar) {
      const selected = [];
      document.getElementsByName("id_ruangan").forEach((input) => (input.checked && selected.push(data.kamar[parseInt(input.value)-1])));
      console.log(selected);
      setSelectedRoom(selected);
      setSelectedStatus('-');
    }
  };

  const handleClear = (e) => {
    setSelectedRoom(initial);
    setSelectedStatus("-");
    document.getElementById("bookingForm").reset();
  };

  return (
    <div className="fixed left-0 top-16 bottom-10 right-0 md:left-64 py-14 md:pt-10 px-8 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 py-8 px-12 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center text-gray-800 dark:text-gray-200">
            <FaHotel className="text-yellow-500 mr-2" /> Tambah Booking
          </h2>
          <MapKamar room={data.kamar} changeTanggal={setSelectedDate} booked={booked} clicked={handleRoomClick} />
          <div className="p-4 bg-gray-200 rounded-xl mt-4 shadow-lg border-2 border-gray-400">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-2">
              <div className="flex p-2 md:col-span-4 items-center shadow-md justify-start rounded-lg bg-white dark:bg-gray-800">
                <FaBed className="text-yellow-600 text-xl mx-4" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Jumlah Bed:
                  </h4>
                  <p className="text-gray-800 text-md font-bold">
                    {tipe[selectedRoom.tipe]}
                  </p>
                </div>
              </div>
              <div className="flex p-2 md:col-span-3 items-center shadow-md justify-start rounded-lg bg-white dark:bg-gray-800">
                <FaTags className="text-yellow-600 text-xl mx-4" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Status:
                  </h4>
                  <p className={`text-gray-800 text-md font-bold ${selectedStatus === "kosong" ? "text-green-600" : "text-red-600"}`}>
                    {selectedStatus}
                  </p>
                </div>
              </div>
              <div className="flex p-2 md:col-span-4 items-center shadow-md justify-start rounded-lg bg-white dark:bg-gray-800">
                <FaDollarSign className="text-yellow-600 text-xl mx-4" />
                <div>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Harga per Malam :
                  </h4>
                  <p className="text-gray-800 text-md font-bold">
                    Rp. {selectedRoom.harga}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* form booking */}
        <FormBooking room={selectedRoom} tipe={tipe[selectedRoom.tipe]} clear={handleClear} promo={data.promo} />
      </div>
    </div>
  );
};

export default TambahBooking;

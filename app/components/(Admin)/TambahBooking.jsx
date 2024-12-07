"use client";

import { useState, useEffect, useActionState } from "react";
import { FaHotel, FaBed, FaDollarSign, FaTags, FaArrowLeft } from "react-icons/fa";
import MapKamar from "./booking/mapKamar";
import FormBooking from "./booking/formBooking";
import Link from "next/link";
import { DarkModeContext } from "@/app/(contexts)/DarkModeContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
import { newReservation } from "@/app/prisma/reservation";

const TambahBooking = (data) => {
  const initial = {
    id: 0,
    tipe: 0,
    harga: 0,
  }
  const today = new Date().toISOString().split('T')[0];
  const [booked, setbooked] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [selectedDate, setSelectedDate] = useState(today);
  const [state, action] = useActionState(newReservation, undefined);

  useEffect(() => {
    //console.log('hehehe - ');
    const newdata = async () => {
      const updatedData = await data.getByDate(selectedDate);
      //console.log(updatedData);
      setbooked(updatedData);
      document.getElementsByName("id_ruangan").forEach((input) => (input.checked = false));
    }
    newdata();
  }, [selectedDate]);

  const handleRoomClick = (kamar) => {
    //console.log("called");
    if (kamar) {
      //console.log("used");
      const selected = [];
      document.getElementsByName("id_ruangan").forEach((input) => (input.checked && selected.push(data.kamar[parseInt(input.value) - 1])));
      //console.log(selected);
      setSelectedRoom(selected);
    }
  };
/*
//safe alert
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: "Pastikan data yang Anda masukkan sudah benar.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: isDarkMode ? "#f59e0b" : "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, simpan!",
      cancelButtonText: "Batal",
      background: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Booking Berhasil!",
          text: "Data booking berhasil disimpan.",
          icon: "success",
          confirmButtonText: "OK",
          background: isDarkMode ? "#333" : "#fff",
          color: isDarkMode ? "#fff" : "#000",
          confirmButtonColor: isDarkMode ? "#f59e0b" : "#f59e0b",
        }).then(() => {
          const updatedBookingList = [...bookingList, newBooking];
          setBookingList(updatedBookingList);
          localStorage.setItem(
            "bookingList",
            JSON.stringify(updatedBookingList)
          );
          router.push("/DaftarBooking"); // Mengarahkan ke halaman lain setelah notifikasi
        });
      }
    });
  */
  const handleClear = (e) => {
    document.getElementsByName("id_ruangan").forEach((input) => (input.checked = false));
    setSelectedRoom([]);
  };

  return (
    <div className="fixed left-0 top-14 bottom-10 right-0 md:left-64 py-14 md:pt-10 px-8 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 py-8 px-12 rounded-xl shadow-lg md:col-span-2">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center text-gray-800 dark:text-gray-200">
            <FaHotel className="text-yellow-500 mr-2" /> Tambah Booking
          </h2>
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
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: "115px" }}
            />
          </div>
          <MapKamar room={data.kamar} booked={booked} clicked={handleRoomClick} />
        </div>

        {/* form booking */}
        <div className="bg-white py-8 px-12 rounded-xl shadow-lg w-full max-w-3xl md:col-span-1">
          <FormBooking room={selectedRoom} clear={handleClear} promo={data.promo} state={state} action={action} />
        </div>

      </div>
    </div>
  );
};

export default TambahBooking;

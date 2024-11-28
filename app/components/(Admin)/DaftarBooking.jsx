"use client";

import { FaPlus, FaBookOpen, FaArrowLeft, FaTrash, FaSearch, FaSignInAlt, FaEdit, FaTimes, FaHotel, FaBed, FaTags, FaDollarSign } from "react-icons/fa";
import Link from "next/link";
import { useTransition } from "react";

const DaftarBooking = (data) => {
  // console.log(data.list);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  /*
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];
  const [bookingList, setBookingList] = useState([]);
  const [villaTiara1, setVillaTiara1] = useState([]);
  const [villaTiara2, setVillaTiara2] = useState([]);
  const [tamuList, setTamuList] = useState([]);
  const [checkInList, setCheckInList] = useState([]);
  const [riwayatList, setRiwayatList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookingList, setFilteredBookingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingBooking, setEditingBooking] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBed, setSelectedBed] = useState("-");
  const [selectedStatus, setSelectedStatus] = useState("-");
  const [selectedRoomHarga, setSelectedRoomHarga] = useState(0);

  // Load data tamu dari local storage saat komponen dimuat
  useEffect(() => {
    const storedBookingList =
      JSON.parse(localStorage.getItem("bookingList")) || [];
    const storedTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    const storedCheckInList =
      JSON.parse(localStorage.getItem("checkInList")) || [];
    const storedKamarList = JSON.parse(localStorage.getItem("kamarList"));
    const storedRiwayatList =
      JSON.parse(localStorage.getItem("riwayatList")) || [];

    setBookingList(storedBookingList);
    setTamuList(storedTamuList);
    setCheckInList(storedCheckInList);
    setVillaTiara1(storedKamarList.VillaTiara1 || []);
    setVillaTiara2(storedKamarList.VillaTiara2 || []);
    setRiwayatList(storedRiwayatList);
    setFilteredBookingList(storedBookingList);
  }, []);

  useEffect(() => {
    const results = bookingList.filter(
      (booking) =>
        booking.namaTamu.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.idKamar.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.noTelepon.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBookingList(results);
  }, [searchTerm, bookingList]);

  // Memperbarui daftar kamar setiap kali tanggal yang dipilih berubah
  useEffect(() => {
    checkRoomAvailabilityByDate();
  }, [selectedDate, bookingList, checkInList, riwayatList]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (id) => {
    const bookingToEdit = bookingList.find((booking) => booking.id === id);
    setEditingBooking(bookingToEdit);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedBookingList = bookingList.map((booking) =>
      booking.id === editingBooking.id ? editingBooking : booking
    );
    setBookingList(updatedBookingList);
    localStorage.setItem("bookingList", JSON.stringify(updatedBookingList));
    setEditingBooking(null);
    setIsEditing(false);
    alert("Data berhasil diperbarui!");
  };

  const calculateHarga = (tanggalCheckIn, tanggalCheckOut, hargaKamar) => {
    if (tanggalCheckIn && tanggalCheckOut) {
      const checkInTime = new Date(tanggalCheckIn);
      const checkOutTime = new Date(tanggalCheckOut);
      const timeDifference = checkOutTime - checkInTime;
      const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
      const total = daysDifference * hargaKamar;
      return total;
    }
    return 0;
  };

  // Fungsi untuk menghapus tamu berdasarkan index
  const handleDelete = (id) => {
    const updatedBookingList = bookingList.filter(
      (booking) => booking.id !== id
    );
    setBookingList(updatedBookingList);
    localStorage.setItem("bookingList", JSON.stringify(updatedBookingList));
    alert("Hapus Data Berhasil!");
    setFilteredBookingList(updatedBookingList);
  };

  // Fungsi untuk menghapus semua data booking
  const handleClearData = () => {
    localStorage.removeItem("bookingList");
    setBookingList([]);
    alert("Hapus Seluruh Data Booking Berhasil!");
    setFilteredBookingList([]);
  };

  // Fungsi untuk checkIn berdasarkan index
  const handleCheckInClick = (id) => {
    // Temukan booking yang cocok berdasarkan id
    const bookingToCheckIn = bookingList.find((booking) => booking.id === id);

    // Buat objek dengan status yang diperbarui
    const updatedBookingStatus = {
      ...bookingToCheckIn,
      statusBooking: "checkin",
      statusKamar: "checked",
    };

    // Filter bookingList untuk menghapus booking yang di-check-in
    const updatedBookingList = bookingList.filter(
      (booking) => booking.id !== id
    );

    // Tambahkan booking yang diperbarui ke checkInList
    const newCheckInList = [...checkInList, updatedBookingStatus];

    // Update state dengan daftar booking dan check-in yang baru
    setBookingList(updatedBookingList);
    setCheckInList(newCheckInList);

    // Simpan perubahan ke localStorage
    localStorage.setItem("bookingList", JSON.stringify(updatedBookingList));
    localStorage.setItem("checkInList", JSON.stringify(newCheckInList));

    // Data tamu baru untuk disimpan
    const newTamu = {
      id: Date.now(),
      namaLengkap: updatedBookingStatus.namaTamu,
      noHp: updatedBookingStatus.noTelepon,
      keperluan: "Check-in",
      tanggal: new Date().toLocaleDateString(),
      waktu: new Date().toLocaleTimeString(),
    };

    // Tambahkan data tamu baru ke daftar tamu di localStorage
    const existingTamuList = JSON.parse(localStorage.getItem("tamuList")) || [];
    const updatedTamuList = [newTamu, ...existingTamuList];
    setTamuList(updatedTamuList);
    localStorage.setItem("tamuList", JSON.stringify(updatedTamuList));

    alert("Check-In Berhasil!");
    router.push("/DaftarCheckIn");
  };

  // Fungsi untuk navigasi ke halaman tambah tamu
  const handleAddGuest = () => {
    router.push("/TambahBooking");
  };

  // Hitung indeks untuk item yang akan ditampilkan pada halaman saat ini
  const sortedBookingList = [...filteredBookingList].reverse();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookingList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Fungsi untuk menangani klik pada tombol kamar
  const handleRoomClick = (roomId) => {
    const allKamar = [...villaTiara1, ...villaTiara2];
    const kamar = allKamar.find((kamar) => kamar.kodeKamar === roomId);
    if (kamar) {
      setSelectedRoomHarga(kamar.hargaKamar);
      setSelectedBed(kamar.jumlahBedKamar);
      setSelectedStatus(kamar.status);
      setEditingBooking((prev) => ({
        ...prev,
        idKamar: kamar.kodeKamar,
        tipeKamar: kamar.tipeKamar,
        harga: calculateHarga(
          prev.tanggalCheckIn,
          prev.tanggalCheckOut,
          kamar.hargaKamar
        ),
      }));
    }
  };

  // Fungsi untuk mengecek ketersediaan kamar berdasarkan tanggal yang dipilih
  const checkRoomAvailabilityByDate = useCallback(() => {
    if (selectedDate) {
      const updateRoomStatus = (roomList) => {
        return roomList.map((kamar) => {
          // Tentukan status kamar berdasarkan kondisi di bookingList
          const inBookingPeriod = bookingList.some(
            (booking) =>
              booking.idKamar === kamar.kodeKamar &&
              new Date(booking.tanggalCheckIn) <= new Date(selectedDate) &&
              new Date(booking.tanggalCheckOut) >= new Date(selectedDate)
          );

          // Tentukan status kamar berdasarkan kondisi di checkInList
          const inCheckInPeriod = checkInList.some(
            (checkin) =>
              checkin.idKamar === kamar.kodeKamar &&
              new Date(checkin.tanggalCheckIn) <= new Date(selectedDate) &&
              new Date(checkin.tanggalCheckOut) >= new Date(selectedDate)
          );

          // Tentukan status kamar berdasarkan kondisi di riwayatList
          const inRiwayatPeriod = riwayatList.some(
            (riwayat) =>
              riwayat.idKamar === kamar.kodeKamar &&
              new Date(riwayat.tanggalCheckIn) <= new Date(selectedDate) &&
              new Date(riwayat.tanggalCheckOut) >= new Date(selectedDate)
          );

          // Set status kamar sesuai dengan kondisi yang ditemukan
          let status = "kosong";
          if (inRiwayatPeriod) {
            status = "kosong";
          } else if (inCheckInPeriod) {
            status = "checked";
          } else if (inBookingPeriod) {
            status = "booked";
          }

          return { ...kamar, status }; // Update status kamar
        });
      };

      const updatedVillaTiara1 = updateRoomStatus(villaTiara1);
      const updatedVillaTiara2 = updateRoomStatus(villaTiara2);

      setVillaTiara1(updatedVillaTiara1);
      setVillaTiara2(updatedVillaTiara2);
    }
  }, [
    selectedDate,
    bookingList,
    checkInList,
    riwayatList,
    villaTiara1,
    villaTiara2,
  ]);

  const handleCheckInChange = (e) => {
    const newCheckIn = e.target.value;
    setEditingBooking((prev) => {
      const updatedHarga = calculateHarga(
        newCheckIn,
        prev.tanggalCheckOut,
        selectedRoomHarga
      );
      return { ...prev, tanggalCheckIn: newCheckIn, harga: updatedHarga };
    });
  };

  const handleCheckOutChange = (e) => {
    const newCheckOut = e.target.value;
    setEditingBooking((prev) => {
      const updatedHarga = calculateHarga(
        prev.tanggalCheckIn,
        newCheckOut,
        selectedRoomHarga
      );
      return { ...prev, tanggalCheckOut: newCheckOut, harga: updatedHarga };
    });
  };
*/
  const [pending, checkin] = useTransition()



  return (
    <div className="fixed left-0 top-16 bottom-10 right-0 md:left-64 pt-14 pb-6 md:pt-10 px-8 overflow-y-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8 flex items-center justify-center">
        <FaBookOpen className="text-yellow-500 mr-2" />
        Daftar Booking
      </h2>
      <div className="mt-6 flex justify-between items-center text-sm mb-6">
        <Link href="/Dashboard" className="flex items-center text-md font-semibold text-gray-600 dark:text-gray-400 hover:text-yellow-500 transition">
          <FaArrowLeft className="text-yellow-500 mr-2" />
          Kembali
        </Link>
        <Link href="/TambahBooking" className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm flex items-center transition">
          <FaPlus className="mr-2" />
          Tambah Booking
        </Link>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Cari Berdasarkan Nama, ID Kamar, atau No Telepon"
          className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-700 rounded-md shadow-md dark:bg-gray-600 dark:text-gray-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
      </div>
      {/* Tabel booking */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 text-left shadow-lg rounded-lg">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">ID Kamar</th>
              <th className="px-4 py-2">Nama Tamu</th>
              <th className="px-4 py-2">No Telepon</th>
              <th className="px-4 py-2">Check-in</th>
              <th className="px-4 py-2">Check-out</th>
              <th className="px-4 py-2">Total Harga</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody id="bookTableBody">
            {data.list.length > 0 ? (
              data.list.map((booking, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">
                    {index}
                  </td>
                  <td className="border px-4 py-2">{booking.rooms.nomor}</td>
                  <td className="border px-4 py-2">{booking.nama}</td>
                  <td className="border px-4 py-2">{booking.hp}</td>
                  <td className="border px-4 py-2">{booking.masuk.toLocaleDateString('id-id', options)}</td>
                  <td className="border px-4 py-2">
                    {booking.keluar.toLocaleDateString('id-id', options)}
                  </td>
                  <td className="border px-4 py-2">{booking.total}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-green-600 hover:bg-green-500 text-white px-2 mx-1 py-1 rounded-md" onClick={() => handleCheckInClick(booking.id)}>
                      <FaSignInAlt />
                    </button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-md mx-1" onClick={() => handleEditClick(booking.id)} >
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(booking.id)} className="bg-red-500 hover:bg-red-600 text-white px-2 mx-1 py-1 rounded-md" >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 dark:text-gray-400">
                  Tidak ada booking yang terdaftar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT RESERVASI */}
      {isEditing &&
        (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-80 flex justify-center items-start z-50 p-10 py-24 md:left-64 overflow-auto">
            <div className="md:flex bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="bg-gray-300 dark:bg-gray-900 md:rounded-bl-xl rounded-tl-xl md:rounded-tr-none rounded-tr-xl py-9 px-12 md:col-span-2">
                <div className="md:flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-center flex items-center justify-center text-gray-800 dark:text-gray-200 pb-6 md:pb-0">
                    <FaHotel className="text-yellow-500 mr-2" /> Denah Kamar
                  </h2>
                  <input
                    type="date"
                    id="selectedDate"
                    className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-500 dark:bg-gray-600 dark:text-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition duration-300 ease-in-out"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={today}
                    style={{ width: "115px" }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="logo bg-gradient-to-br from-orange-500 to-red-500 text-white text-md rounded-lg p-2 mb-4 text-center font-bold">
                      Villa Tiara 2
                    </h2>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      {villaTiara2.map((kamar) => (
                        <div
                          key={kamar.kodeKamar}
                          className={`text-center p-2 border-2 rounded-lg cursor-pointer ${kamar.status === "checked"
                            ? "bg-green-600 text-white"
                            : kamar.status === "booked"
                              ? "bg-yellow-500 text-black"
                              : "bg-yellow-50 dark:bg-gray-700 border-yellow-500 dark:border-gray-500 hover:border-orange-700 dark:hover:border-orange-500"
                            }`}
                          onClick={() => handleRoomClick(kamar.kodeKamar)}
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {kamar.kodeKamar}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="logo bg-gradient-to-br from-orange-500 to-red-500 text-white text-md rounded-lg p-2 mb-4 text-center font-bold">
                      Villa Tiara 1
                    </h2>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      {villaTiara1.map((kamar) => (
                        <div
                          key={kamar.kodeKamar}
                          className={`text-center p-2 border-2 rounded-lg cursor-pointer ${kamar.status === "checked"
                            ? "bg-green-600 text-white"
                            : kamar.status === "booked"
                              ? "bg-yellow-500 text-black"
                              : "bg-yellow-50 dark:bg-gray-700 border-yellow-500 dark:border-gray-500 hover:border-orange-700 dark:hover:border-orange-500"
                            }`}
                          onClick={() => handleRoomClick(kamar.kodeKamar)}
                        >
                          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                            {kamar.kodeKamar}
                          </h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block p-4 bg-gray-200 dark:bg-gray-700 rounded-xl mt-4 shadow-lg border-2 border-gray-400 dark:border-gray-500">
                  <div className="grid grid-cols-1 md:grid-cols-11 gap-2">
                    <div className="flex p-2 md:col-span-4 items-center shadow-md justify-start rounded-lg bg-white dark:bg-gray-800">
                      <FaBed className="text-yellow-600 text-xl mx-4" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          Jumlah Bed:
                        </h4>
                        <p className="text-gray-800 dark:text-gray-200 text-md font-bold">
                          {selectedBed}
                        </p>
                      </div>
                    </div>
                    <div className="flex p-2 md:col-span-3 items-center shadow-md justify-start rounded-lg bg-white dark:bg-gray-800">
                      <FaTags className="text-yellow-600 text-xl mx-4" />
                      <div>
                        <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          Status:
                        </h4>
                        <p
                          className={`text-gray-800 dark:text-gray-200 text-md font-bold ${selectedStatus === "kosong"
                            ? "text-green-600"
                            : "text-red-600"
                            }`}
                        >
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
                        <p className="text-gray-800 dark:text-gray-200 text-md font-bold">
                          Rp. {selectedRoomHarga.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-6 px-10 w-auto">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                  Edit Booking
                </h3>
                <form className="text-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        ID Kamar
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={editingBooking.idKamar}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            idKamar: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Tipe Kamar
                      </label>
                      <input
                        type="text"
                        readOnly
                        value={editingBooking.tipeKamar}
                        onChange={(e) =>
                          setEditingBooking({
                            ...editingBooking,
                            tipeKamar: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Nama Tamu
                    </label>
                    <input
                      type="text"
                      value={editingBooking.namaTamu}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          namaTamu: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      No Telepon
                    </label>
                    <input
                      type="text"
                      value={editingBooking.noTelepon}
                      onChange={(e) =>
                        setEditingBooking({
                          ...editingBooking,
                          noTelepon: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Check-In
                      </label>
                      <input
                        type="date"
                        min={today}
                        value={editingBooking?.tanggalCheckIn || ""}
                        onChange={handleCheckInChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Check-Out
                      </label>
                      <input
                        type="date"
                        min={editingBooking.tanggalCheckIn}
                        value={editingBooking?.tanggalCheckOut || ""}
                        onChange={handleCheckOutChange}
                        className="w-full p-2 border border-gray-300 dark:border-gray-500 rounded-md dark:bg-gray-700 dark:text-gray-200"
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                      Total Harga (Rp)
                    </label>
                    <input
                      type="number"
                      value={editingBooking?.harga || 0}
                      readOnly
                      className="w-full p-2 border border-gray-300 dark:border-gray-500 bg-gray-100 dark:bg-gray-700 rounded-md dark:text-gray-200"
                    />
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center"
                    >
                      <FaTimes className="mr-2" />
                      Batal
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveEdit}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )
      }


      {/* pagination */}
      <div className="flex items-center justify-between my-6">
        <div>
          {Array.from(
            { length: Math.ceil(filteredBookingList.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 p-2 rounded ${currentPage === index + 1
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                  : "bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                  }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarBooking;

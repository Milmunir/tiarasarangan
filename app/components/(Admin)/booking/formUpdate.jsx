import { FaBed, FaDollarSign, FaEdit, FaHotel, FaTags, FaTimes } from "react-icons/fa";

export default function FormUpdate(data) {

    return (
        <>
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
        </>
    )
}
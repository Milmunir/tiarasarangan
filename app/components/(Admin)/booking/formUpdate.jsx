import { FaBed, FaDollarSign, FaEdit, FaHotel, FaTags, FaTimes } from "react-icons/fa";
import MapKamar from "./mapKamar";
import { useEffect, useState, useActionState } from "react";
import FormBooking from "./formBooking";
import { newReservation } from "@/app/prisma/reservation";

export default function FormUpdate(data) {
    //console.log(data.reservation);
    const today = new Date().toISOString().split('T')[0];
    const [selectedRoom, setselectedRoom] = useState(Array.from(data.reservation.id_ruangan, (x) => data.kamar[x - 1]));
    const [selectedDate, setselectedDate] = useState(data.reservation.masuk.toISOString().split('T')[0]);
    const [booked, setbooked] = useState(data.reservation.rooms.map((key) => { return { id_ruangan: key.id, nomor: key.nomor } }));
    const [state, action] = useActionState(newReservation, undefined);

    // const [SelectedRoom, setSelectedRoom] = useState(data.reservation.id_ruangan);

    function setDefaultInputKamar() {
        // //console.log('selectedDate');
        const tempDate = new Date(selectedDate) //buat komparasi. gk bisa langsung manggil getTime() pas construct
        if (tempDate.getTime() >= data.reservation.masuk.getTime() && tempDate.getTime() <= data.reservation.keluar.getTime()) {
            document.getElementsByName("id_ruangan").forEach((input) => (input.checked = data.reservation.id_ruangan.includes(parseInt(input.value))));

        }
        else {
            document.getElementsByName("id_ruangan").forEach((input) => (input.checked = false));
        }
    }

    //initial render
    useEffect(() => {
        document.getElementsByName("id_ruangan").forEach((input) => (input.checked = data.reservation.id_ruangan.includes(input.value)));
        setDefaultInputKamar()
    }, [data.reservation]);

    useEffect(() => {
        const newdata = async () => {
            const updatedData = await data.getByDate(selectedDate, data.reservation.noinvoice);
            // const tempDate = new Date(selectedDate) //buat komparasi. gk bisa langsung manggil getTime() pas construct
            //console.log(updatedData);
            setbooked(updatedData);
            setDefaultInputKamar();
        }
        newdata();
    }, [selectedDate]);

    const handleRoomClick = (kamar) => {
        if (kamar) {
            const selected = [];
            document.getElementsByName("id_ruangan").forEach((input) => (input.checked && selected.push(data.kamar[parseInt(input.value) - 1])));
            //console.log(selected);
            setselectedRoom(selected)
        }
    };

    const handleClear = (e) => {
        document.getElementById("bookingForm").reset();
        setDefaultInputKamar();
    };
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
                                onChange={(e) => setselectedDate(e.target.value)}
                                style={{ width: "115px" }}
                            />
                        </div>

                        <MapKamar room={data.kamar} booked={booked} clicked={handleRoomClick} />

                    </div>
                    <div className="py-6 px-10 w-auto">
                        <div className="w-full flex justify-between">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                Edit Booking
                            </h3>
                            <FaTimes className="h-8 aspect-square cursor-pointer" onClick={() => data.isEditing(false)} />
                            <input type="text" form="bookingForm" name="noinvoice" hidden readOnly value={data.reservation.noinvoice} />
                        </div>
                        <FormBooking room={selectedRoom} default={data.reservation} clear={handleClear} promo={data.promo} state={state} action={action} />
                    </div>
                </div>
            </div>
        </>
    )
}
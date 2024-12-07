import { useEffect, useRef, useState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { checkOut, newReservation } from "@/app/prisma/reservation";
import { promoValidator } from "@/app/helper/promo";

export default function FormBooking(data) {
    function defaultRes() {
        //console.log("calledyes");
        if (data.default) {
            //console.log("changed the res");
            return {
                checkIn: data.default.masuk,
                checkOut: data.default.keluar
            }
        }
        return {}
    }

    const today = new Date().toISOString().split('T')[0];
    const resDate = useRef(defaultRes())
    const [totalHarga, setTotalHarga] = useState(data.default?.total ? data.default.total : 0);
    const [HargaAsli, setHargaAsli] = useState(data.default?.asli ? data.default.asli : 0);
    const [promoNow, setpromoNow] = useState(0);
    const [isPromoValid, setisPromoValid] = useState(true);
    const [checkIn, setcheckIn] = useState(resDate.current.checkIn);


    const calculateTotalHarga = () => {
        //console.log(resDate.current);
        if (resDate.current.checkIn && resDate.current.checkOut) {
            //console.log(data.room);
            //console.log('calculateing');
            if (data.room.length == 0) {
                //console.log("returned");
                setHargaAsli(0);
                setTotalHarga(0);
                return
            }
            let HargaAsli = 0;
            data.room.map((room) => HargaAsli = HargaAsli + room.harga);
            const timeDifference = resDate.current.checkOut - resDate.current.checkIn;
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            const total = daysDifference * HargaAsli;
            const validatedPromo = promoValidator(total, promoNow, resDate.current.checkIn);
            //console.log(validatedPromo);
            setisPromoValid(validatedPromo.isTrue);
            setHargaAsli(total);
            setTotalHarga(validatedPromo.total);
        };
    };

    function checkInChange(date) {
        //console.log("invoked");
        if (date == "") {
            return
        }
        setcheckIn(date)
        date = new Date(date);
        resDate.current.checkIn = date;
        calculateTotalHarga();
    };

    function checkOutChange(date) {
        //console.log("invoked");
        if (date == "") {
            return
        }
        date = new Date(date);
        resDate.current.checkOut = date;
        calculateTotalHarga();
    };

    useEffect(() => {
        calculateTotalHarga();
    }, [data.room, promoNow]);

    function clearHandler() {
        resDate.current = defaultRes();
        setHargaAsli(data.default?.asli ? data.default.asli : 0)
        setTotalHarga(data.default?.total ? data.default.total : 0);
        const form = document.getElementById("bookingForm");
        form.reset();
        const formElements = form.querySelectorAll("input[name]");
        formElements.forEach(element => {
            const event = new Event("change", { bubbles: true });
            element.dispatchEvent(event);
        })
        data.clear()
    }
    
    useEffect(() => {
        //console.log(data.state);
        clearHandler()
    }, [data.state]);

    return (
        <form id="bookingForm" className="space-y-4 text-sm" action={data.action}>
            {data.state?.errors?.id_ruangan && <div className="text-xs text-red-700" >{data.state.errors.id_ruangan}</div>}
            <div className="mb-4">
                <label htmlFor="nama" className="block text-gray-700 font-medium" >Nama Tamu:</label>
                <input type="text" id="nama" name="nama" className="w-full px-4 py-2 border rounded-md" defaultValue={data.default?.nama ? data.default.nama : ''} required placeholder="Masukkan Nama Lengkap" />
                {data.state?.errors?.name && <div className="text-xs text-red-700" >{data.state.errors.name}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="hp" className="block text-gray-700 font-medium" >No Telepon:</label>
                <input type="number" id="hp" name="hp" className="w-full px-4 py-2 border rounded-md" defaultValue={data.default?.hp ? data.default.hp : ''} required placeholder="Masukkan No Telepon" />
                {data.state?.errors?.hp && <div className="text-xs text-red-700" >{data.state.errors.hp}</div>}
            </div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tanggal/waktu check in */}
                <div>
                    <label htmlFor="masuk" className="block text-gray-700 font-medium" >Check-in:</label>
                    <input type="date" id="masuk" name="masuk" className="w-full px-4 py-2 border rounded-md" min={today} defaultValue={data.default?.masuk ? data.default.masuk.toISOString().split('T')[0] : ""} onChange={(e) => checkInChange(e.target.value)} required />
                </div>
                {/* Tanggal/waktu check out */}
                <div>
                    <label htmlFor="keluar" className="block text-gray-700 font-medium">Check-out:</label>
                    <input type="date" id="keluar" name="keluar" className="w-full px-4 py-2 border rounded-md" min={checkIn} defaultValue={data.default?.keluar ? data.default.keluar.toISOString().split('T')[0] : ""} onChange={(e) => checkOutChange(e.target.value)} required />
                </div>
            </div>
            {data.state?.errors?.masuk && <div className="text-xs text-red-700" >{data.state.errors.masuk}</div>}
            {data.state?.errors?.keluar && <div className="text-xs text-red-700" >{data.state.errors.keluar}</div>}
            {data.state?.errors?.tanggal && <div className="text-xs text-red-700" >{data.state.errors.tanggal}</div>}
            {/* Harga */}
            <div className="mb-4">
                <label htmlFor="asli" className="block text-gray-700 font-medium" >Harga Awal (Rp):</label>
                <input type="number" value={HargaAsli} name="asli" id="asli" min="0" readOnly className="w-full px-4 py-2 border rounded-md" placeholder="Harga Asli Sebelum Promo" required />
                {data.state?.errors?.asli && <div className="text-xs text-red-700" >{data.state.errors.asli}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="total" className="block text-gray-700 font-medium" >Total Harga (Rp):</label>
                <input type="number" value={totalHarga} onChange={(e) => setTotalHarga(e.target.value)} name="total" id="total" min="0" className="w-full px-4 py-2 border rounded-md" placeholder="Masukkan Jumlah Harga" required />
                {data.state?.errors?.total && <div className="text-xs text-red-700" >{data.state.errors.total}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="dp" className="block text-gray-700 font-medium" >DP (Rp):</label>
                <input type="number" name="dp" id="dp" min="0" defaultValue={data.default?.dp ? data.default.dp : ''} className="w-full px-4 py-2 border rounded-md" placeholder="Masukkan Jumlah DP" required />
                {data.state?.errors?.dp && <div className="text-xs text-red-700" >{data.state.errors.dp}</div>}
            </div>

            <div className="mb-4">
                <label htmlFor="promo" className="block text-gray-700 font-medium" >promo</label>
                <select name="promo" id="promo" className="w-full px-4 py-2 border rounded-md" defaultValue={data.default?.promo ? data.default.promo : ''} placeholder="Prommo yang dipakai" onChange={(e) => setpromoNow(data.promo[e.target.value - 1])}>
                    <option value='0'>--kosong--</option>
                    {data.promo.map((promo) => (
                        <option key={promo.id} value={promo.id}>{promo.code}</option>
                    ))}
                </select>
                {data.state?.errors?.promo || !isPromoValid && <div className="text-xs text-red-700" >Promo tidak berlaku untuk tanggal tersebut</div>}
            </div>

            {/* Tombol Submit */}
            <div className="flex justify-center items-center space-x-2">
                <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center" onClick={() => clearHandler()} >
                    <FaTrash className="mr-2" />
                    Clear
                </button>
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center">
                    <FaSave className="mr-2" />
                    Submit
                </button>
            </div>
        </form>
    )
}
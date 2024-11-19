import { useEffect, useRef, useState, useActionState } from "react";
import { FaSave, FaTrash } from "react-icons/fa";
import { newReservation } from "@/app/prisma/reservation";

export default function FormBooking(data) {
    const today = new Date().toISOString().split('T')[0];
    const resDate = useRef({})
    const [totalHarga, setTotalHarga] = useState(0);
    const [promoNow, setpromoNow] = useState(0);
    const [HargaAsli, setHargaAsli] = useState(0);
    const [checkIn, setcheckIn] = useState(resDate.current.checkIn);
    const [state, action] = useActionState(newReservation, undefined);

    const calculateTotalHarga = () => {
        if (resDate.current.checkIn && resDate.current.checkOut) {
            console.log(promoNow);
            if (data.room.length == 0) {
                return
            }
            let HargaAsli = 0;
            data.room.map((room) => HargaAsli = HargaAsli + room.harga);
            const timeDifference = resDate.current.checkOut - resDate.current.checkIn;
            const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
            const total = daysDifference * HargaAsli;
            const hargaAkhir = promoNow? promoHandler(total, promoNow) : total;
            setHargaAsli(hargaAkhir);
            setTotalHarga(hargaAkhir);
        };
    };
    function promoHandler(harga, promo) {
        if (promo.amount != null) {
            return harga-promo.amount;
        }
        if (promo.percent != null) {
            return harga-(harga*promo.percent/100);
        }
    };
    function checkInChange(date) {
        setcheckIn(date)
        date = new Date(date);
        resDate.current.checkIn = date;
        console.log(resDate.current);
        calculateTotalHarga();
    };
    function checkOutChange(date) {
        date = new Date(date);
        resDate.current.checkOut = date;
        console.log(resDate.current);
        calculateTotalHarga();
    };
    useEffect(() => {
        calculateTotalHarga();
    }, [data.room, promoNow]);
    
    useEffect(() => {
        console.log(HargaAsli);
        setTotalHarga(HargaAsli)
    }, [HargaAsli]);

    return (
        <div className="bg-white py-8 px-12 rounded-xl shadow-lg w-full max-w-3xl md:col-span-1">
            <form id="bookingForm" className="space-y-4 text-sm" action={action}>
                
                {/* <div>
                    <h2 className="text-xl font-semibold mb-2 text-center">
                        <span className="font-bold text-orange-600">{data.room.nomor ? data.room.nomor : 'PILIH KAMAR'}</span>
                    </h2>
                    <h2 className="text-md font-semibold mb-4 text-center">
                        <span className="font-bold">{data.tipe === '-' ? '' : data.tipe}</span>
                    </h2>
                </div> */}

                {/* Nama Tamu */}
                {/* <input type="text" id="id_ruangan" defaultValue={data.room.id} name="id_ruangan" className="w-full px-4 py-2 border rounded-md hidden" /> */}
                <div className="mb-4">
                    <label htmlFor="nama" className="block text-gray-700 font-medium" >Nama Tamu:</label>
                    <input type="text" id="nama" name="nama" className="w-full px-4 py-2 border rounded-md" required placeholder="Masukkan Nama Lengkap" />
                    {state?.errors?.name && <div className="text-xs text-red-700" >{state.errors.name}</div>}
                </div>
                <div className="mb-4">
                    <label htmlFor="hp" className="block text-gray-700 font-medium" >No Telepon:</label>
                    <input type="number" id="hp" name="hp" className="w-full px-4 py-2 border rounded-md" required placeholder="Masukkan No Telepon" />
                    {state?.errors?.hp && <div className="text-xs text-red-700" >{state.errors.hp}</div>}
                </div>
                <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tanggal/waktu check in */}
                    <div>
                        <label htmlFor="masuk" className="block text-gray-700 font-medium" >Check-in:</label>
                        <input type="date" id="masuk" name="masuk" className="w-full px-4 py-2 border rounded-md" min={today} onChange={(e) => checkInChange(e.target.value)} required />
                    </div>
                    {/* Tanggal/waktu check out */}
                    <div>
                        <label htmlFor="keluar" className="block text-gray-700 font-medium">Check-out:</label>
                        <input type="date" id="keluar" name="keluar" className="w-full px-4 py-2 border rounded-md" min={checkIn} onChange={(e) => checkOutChange(e.target.value)} required />
                    </div>
                </div>
                {state?.errors?.masuk && <div className="text-xs text-red-700" >{state.errors.masuk}</div>}
                {state?.errors?.keluar && <div className="text-xs text-red-700" >{state.errors.keluar}</div>}
                {state?.errors?.tanggal && <div className="text-xs text-red-700" >{state.errors.tanggal}</div>}
                {/* Harga */}
                <div className="mb-4">
                    <label htmlFor="asli" className="block text-gray-700 font-medium" >Harga Awal (Rp):</label>
                    <input type="number" value={HargaAsli} name="asli" id="asli" min="0" readOnly className="w-full px-4 py-2 border rounded-md" placeholder="Harga Asli Sebelum Promo" required />
                    {state?.errors?.harga && <div className="text-xs text-red-700" >{state.errors.harga}</div>}
                </div>
                
                <div className="mb-4">
                    <label htmlFor="total" className="block text-gray-700 font-medium" >Total Harga (Rp):</label>
                    <input type="number" value={totalHarga} onChange={(e) => setTotalHarga(e.target.value)} name="total" id="total" min="0" className="w-full px-4 py-2 border rounded-md" placeholder="Masukkan Jumlah Harga" required />
                    {state?.errors?.harga && <div className="text-xs text-red-700" >{state.errors.harga}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="dp" className="block text-gray-700 font-medium" >DP (Rp):</label>
                    <input type="number" name="dp" id="dp" min="0" className="w-full px-4 py-2 border rounded-md" placeholder="Masukkan Jumlah DP" required />
                    {state?.errors?.dp && <div className="text-xs text-red-700" >{state.errors.dp}</div>}
                </div>

                <div className="mb-4">
                    <label htmlFor="promo" className="block text-gray-700 font-medium" >promo</label>
                    <select name="promo" id="promo" className="w-full px-4 py-2 border rounded-md" placeholder="Prommo yang dipakai" onChange={(e)=>setpromoNow(data.promo[e.target.value-1])}>
                        <option value='0'>--kosong--</option>
                        {data.promo.map((promo)=>(
                            <option key={promo.id} value={promo.id}>{promo.code}</option>
                        ))}
                    </select>
                </div>

                {/* Tombol Submit */}
                <div className="flex justify-center items-center space-x-2">
                    <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center" onClick={data.clear} >
                        <FaTrash className="mr-2" />
                        Clear
                    </button>
                    <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition flex items-center">
                        <FaSave className="mr-2" />
                        Book
                    </button>
                </div>
            </form>
            {state && console.log(state)}
        </div>
    )
}
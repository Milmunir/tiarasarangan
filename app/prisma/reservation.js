"use server"

import { redirect } from "next/navigation";
import { prisma } from "./conn";
import { z } from "zod";
import { promoValidator } from "../helper/promo";
import { revalidatePath } from "next/cache";

export async function getReservation() {
    const reservation = await prisma.reservations.findMany({
        orderBy: [
            { masuk: 'asc' },
            { noinvoice: 'asc' },
            { id_ruangan: 'asc' }
        ],
        where: {
            status: "booked"
        },
        include: {
            rooms: {
                select: {
                    id: true,
                    nomor: true,
                }
            }
        }
    });
    return reservation;
}

export async function getByDate(date) {
    const data = await prisma.reservations.findMany({
        where: {
            AND: [
                {
                    masuk: {
                        lte: date
                    },
                },
                {
                    keluar: {
                        gte: date
                    }
                }
            ]
        }
    })
    return data;
}

export async function checkIn(noinvoice) {
    const checkin = new Date();
    const result = await prisma.reservations.updateMany({
        where: {
            noinvoice: noinvoice
        },
        data: {
            status: "checkIn",
            masuk: checkin
        }
    })
    return redirect("/DaftarBooking");
}

export async function checkOut(noinvoice) {
    const checkout = new Date();
    const result = await prisma.reservations.updateMany({
        where: {
            noinvoice: noinvoice
        },
        data: {
            status: "checkOut",
            keluar: checkout
        }
    })
    return result;
}

export async function newReservation(state, formdata) {
    // console.log(formdata);
    // const day = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
    const isupdate = formdata.get('noinvoice') ? true : false;
    let data = {
        noinvoice: isupdate ? formdata.get('noinvoice') : Date.now() + '' + formdata.get('id_ruangan'),
        id_ruangan: formdata.getAll('id_ruangan').map(Number),
        nama: formdata.get('nama'),
        hp: formdata.get('hp'),
        masuk: new Date(formdata.get('masuk')),
        keluar: new Date(formdata.get('keluar')),
        asli: parseInt(formdata.get('asli')),
        total: parseInt(formdata.get('total')),
        dp: parseInt(formdata.get('dp')),
        promo: parseInt(formdata.get('promo')),
    }

    //validasi awal
    let errors = {
        id_ruangan: data.id_ruangan.length == 0 ? "Pilih minimal 1 ruangan" : undefined,
        nama: data.nama ? undefined : "Masukkan nama tamu",
        hp: data.hp ? undefined : "Masukkan hp tamu",
        asli: isNaN(data.asli) || data.asli <= 0 ? "Harga tidak valid" : undefined,
        total: isNaN(data.total) || data.total <= 0 ? "Harga tidak valid" : undefined,
        dp: isNaN(data.dp) || data.dp <= 0 ? "DP tidak valid atau 0" : undefined,
        masuk: formdata.get('masuk') ? undefined : "Masukkan tanggal masuk",
        keluar: formdata.get('keluar') ? undefined : "Masukkan tanggal keluar",
    }

    //validasi tanggal
    if (data.masuk.getTime() == data.keluar.getTime()) {
        errors.tanggal = "Tanggal Tidak boleh Sama"
    }
    else {
        errors.tanggal = data.masuk.getTime() > data.keluar.getTime() ? "Tanggal masuk harus diatas keluar" : undefined;
    }
    // console.log(errors);
    // return {errors};

    //validasi harga Asli
    const room = await prisma.rooms.findMany({
        where: {
            id: {
                in: data.id_ruangan
            }
        }
    })
    let hargaAsli = 0
    room.map((room) => hargaAsli = hargaAsli + room.harga);
    hargaAsli = hargaAsli * (Math.ceil((data.keluar - data.masuk) / (1000 * 3600 * 24)));
    if (data.asli != hargaAsli) {
        errors.asli = "Harga tidak valid";
    }

    const promo = data.promo != '0' ? await prisma.promo.findFirst({ where: { id: data.promo } }) : null;
    const validatedPromo = promoValidator(hargaAsli, promo, data.masuk)

    // validasi promo
    if (!validatedPromo.isTrue) {
        errors.promo = "Promo Tidak Valid"
    }

    //cek jika Nego
    if (data.total != validatedPromo.total) {
        data.promo = 0; // 0 => nego 
    }

    // return {isupdate, data};

    //jika update hapus data
    if (isupdate) {
        const existReservasi = await prisma.reservations.findFirst({ where: { noinvoice: data.noinvoice } })
        data.created_at = existReservasi.created_at
        await prisma.reservations.deleteMany({ where: { noinvoice: data.noinvoice } })
    }

    //validasi kamar
    const isexist = await prisma.reservations.findFirst({
        where: {
            OR: [{
                AND: [
                    { masuk: { lte: data.masuk } },
                    { keluar: { gte: data.masuk } },
                    { id_ruangan: { in: data.id_ruangan } }
                ]
            },
            {
                AND: [
                    { masuk: { lte: data.keluar } },
                    { keluar: { gte: data.keluar } },
                    { id_ruangan: { in: data.id_ruangan } }
                ]
            },
            {
                AND: [
                    { masuk: { gte: data.masuk } },
                    { keluar: { lte: data.keluar } },
                    { id_ruangan: { in: data.id_ruangan } }
                ]
            }
            ],
        }

    }).then(Boolean)

    console.log(errors);

    if (isexist) {
        //jika ada yang sudah mengambil tanggal
        errors.id_ruangan = "Ruangan sudah dibooking"
        return { errors }
    } else {
        //jika belum ada yang mengambil tanggal
        let result = [];
        console.log(data.id_ruangan.length);
        for (let i = 0; i < data.id_ruangan.length; i++) {
            let reservasi = { ...data };
            reservasi.id_ruangan = data.id_ruangan[i];
            console.log(data.id_ruangan + " - " + i);
            const hasil = await prisma.reservations.create({ data: reservasi })
            result.push(hasil)
        }
        if (Object.values(errors).every(value => value === undefined)) {
            redirect("/DaftarBooking");
        }
        else {
            return { errors }
        }
    }
}

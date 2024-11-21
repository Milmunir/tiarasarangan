"use server"

import { redirect } from "next/navigation";
import { prisma } from "./conn";

export async function getReservation() {
    const reservation = await prisma.reservations.findMany();
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

export async function newReservation(state, formdata) {
    console.log(formdata);
    const data = {
        id: Date.now() + '' + formdata.get('id_ruangan'),
        id_ruangan: formdata.get('id_ruangan'),
        nama: formdata.get('nama'),
        hp: formdata.get('hp'),
        masuk: new Date(formdata.get('masuk')),
        keluar: new Date(formdata.get('keluar')),
        total: parseInt(formdata.get('total')),
        dp: parseInt(formdata.get('dp')),
    }
    return formdata.getAll('id_ruangan');
    const isexist = await prisma.reservations.findFirst({
        where: {
            OR: [{
                AND: [
                    { masuk: { lte: data.masuk } },
                    { keluar: { gte: data.masuk } },
                    { id_ruangan: data.id_ruangan }
                ]
            },
            {
                AND: [
                    { masuk: { lte: data.keluar } },
                    { keluar: { gte: data.keluar } },
                    { id_ruangan: data.id_ruangan }
                ]
            },
            {
                AND: [
                    { masuk: { gte: data.masuk } },
                    { keluar: { lte: data.keluar } },
                    { id_ruangan: data.id_ruangan }
                ]
            }
            ],
        }

    })
        .then(Boolean)
    if (isexist) {
        //jika ada yang sudah mengambil tanggal
        return { error: 'Tanggal Sudah Diambil' }
    } else {
        //jika belum ada yang mengambil tanggal
        const result = await prisma.reservations.create({
            data: data
        })
        redirect('/DaftarBooking');
    }
}



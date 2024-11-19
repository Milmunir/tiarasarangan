'use server'

import { prisma } from "./conn";

export async function getRoom() {
    const room = await prisma.rooms.findMany({
        select: {
            id: true,
            nomor: true,
            villa: true,
            tipe: true,
            harga: true,
        }
    });
    return room;
}

export async function getRoomByDate(date) {
    const data = await prisma.reservations.findMany({
        where: {
            masuk: {
                lte: date
            },
            keluar: {
                gte: date
            }
        },
        select:{
            id : true,
            id_ruangan : true,
            status : true
        }
    })
    return data;
}



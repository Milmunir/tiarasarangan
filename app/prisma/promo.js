'use server'

import { prisma } from "./conn";

export async function getPromo() {
    const promo = await prisma.promo.findMany({
        select: {
            id: true,
            code: true,
            amount: true,
            percent: true,
            day: true,
        }
    });
    return promo;
}
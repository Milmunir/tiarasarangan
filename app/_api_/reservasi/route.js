import { getByDate, newReservation } from "@/app/prisma/reservation"
import { NextResponse } from "next/server";

export async function POST(request) {
    const data = await request.formData();
    let datas = {}
    for (const value of data.entries()) {
        datas[value[0]] = value[1];
        
    }
    const result = await newReservation(datas);
    return NextResponse.json(result);
}

export async function GET(request) {
    //get data tanggal dari URL
    const data = new URL(request.url);
    const date = data.searchParams.get('date');
    // console.log(data.searchParams.get('date'));
    // console.log(request.arrayBuffer().url);
    const result = await getByDate(date);
    return NextResponse.json({result});
}
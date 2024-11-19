const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const kamar = await prisma.rooms.createMany({
    data: [
      { id: 1, nomor: 'A3-01', tipe: 2, villa: 1, status: 'kosong', harga: 600000 },
      { id: 2, nomor: 'A3-02', tipe: 1, villa: 1, status: 'kosong', harga: 400000 },
      { id: 3, nomor: 'A2-03', tipe: 3, villa: 1, status: 'kosong', harga: 850000 },
      { id: 4, nomor: 'A2-04', tipe: 2, villa: 1, status: 'kosong', harga: 600000 },
      { id: 5, nomor: 'A2-05', tipe: 1, villa: 1, status: 'kosong', harga: 400000 },
      { id: 6, nomor: 'A2-06', tipe: 3, villa: 1, status: 'kosong', harga: 850000 },
      { id: 7, nomor: 'A1-07', tipe: 1, villa: 1, status: 'kosong', harga: 400000 },
      { id: 8, nomor: 'A1-08', tipe: 3, villa: 1, status: 'kosong', harga: 850000 },
      { id: 9, nomor: 'A1-09', tipe: 2, villa: 1, status: 'kosong', harga: 600000 },
      { id: 10, nomor: 'A1-10', tipe: 1, villa: 1, status: 'kosong', harga: 400000 },
      { id: 11, nomor: 'A0-11', tipe: 2, villa: 1, status: 'kosong', harga: 600000 },
      { id: 12, nomor: 'A0-12', tipe: 3, villa: 1, status: 'kosong', harga: 850000 },
      { id: 13, nomor: 'A1-13', tipe: 2, villa: 1, status: 'kosong', harga: 600000 },
      { id: 14, nomor: 'A3-14', tipe: 1, villa: 1, status: 'kosong', harga: 400000 },
      { id: 15, nomor: 'A2-15', tipe: 3, villa: 1, status: 'kosong', harga: 850000 },
      { id: 16, nomor: 'B3-01', tipe: 2, villa: 2, status: 'kosong', harga: 600000 },
      { id: 17, nomor: 'B3-02', tipe: 1, villa: 2, status: 'kosong', harga: 400000 },
      { id: 18, nomor: 'B3-03', tipe: 3, villa: 2, status: 'kosong', harga: 850000 },
      { id: 19, nomor: 'B3-04', tipe: 2, villa: 2, status: 'kosong', harga: 600000 },
      { id: 20, nomor: 'B2-05', tipe: 1, villa: 2, status: 'kosong', harga: 400000 },
      { id: 21, nomor: 'B2-06', tipe: 3, villa: 2, status: 'kosong', harga: 850000 },
      { id: 22, nomor: 'B2-07', tipe: 1, villa: 2, status: 'kosong', harga: 400000 },
      { id: 23, nomor: 'B2-08', tipe: 3, villa: 2, status: 'kosong', harga: 850000 },
      { id: 24, nomor: 'B1-09', tipe: 2, villa: 2, status: 'kosong', harga: 600000 },
      { id: 25, nomor: 'B1-10', tipe: 2, villa: 2, status: 'kosong', harga: 600000 },
      { id: 26, nomor: 'B1-11', tipe: 2, villa: 2, status: 'kosong', harga: 600000 },
    ]
  })
  console.log(kamar)

  const promo = await prisma.promo.createMany({
    data: [
      {
        id: 1,
        code: 'LGNGNGR',
        day: {
          monday: true,
          tuesday: true,
          wednesday: true,
          thursday: true,
          friday: true,
          saturday: false,
          sunday: false,
        },
        percent: 20
      },
      { 
        id: 2,
        code: 'LGNGW', 
        day:{
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: true,
          sunday: false,
        },
        amount: 100000,
      }
    ]
  })
  console.log(promo);
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
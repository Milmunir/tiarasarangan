import AdminTemplate from "@/app/(templates)/(Admin)/AdminTemplate";
import TambahBooking from "@/app/components/(Admin)/TambahBooking";
import { getPromo } from "@/app/prisma/promo";
import { getByDate, getRoom, getRoomByDate } from "@/app/prisma/room";


const BookingPage = async () => {
  const listkamar = await getRoom();
  const promo = await getPromo();
  // console.log(listkamar);
  async function changeDateHandler(date) {
    "use server"
    date = new Date(date);
    console.log('changeDateHandler - '+date);
    const listbooking = await getRoomByDate(date);
    return listbooking;
  }
  
  return (
    <>
      <AdminTemplate>
        <TambahBooking kamar={listkamar} getByDate={changeDateHandler} promo={promo} />
      </AdminTemplate>
    </>
  );
};

export default BookingPage;

import AdminTemplate from "@/app/(templates)/(Admin)/AdminTemplate";
import DaftarBooking from "@/app/components/(Admin)/DaftarBooking";
import { getPromo } from "@/app/prisma/promo";
import { getReservation } from "@/app/prisma/reservation";
import { getRoom, getRoomByDate } from "@/app/prisma/room";

const DaftarBookingPage = async () => {
  const dataBooking = await getReservation();
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
        <DaftarBooking list={dataBooking} changeDate={changeDateHandler} kamar={listkamar} promo={promo} />
      </AdminTemplate>
    </>
  );
};

export default DaftarBookingPage;

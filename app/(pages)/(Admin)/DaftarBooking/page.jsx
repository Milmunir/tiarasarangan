import AdminTemplate from "@/app/(templates)/(Admin)/AdminTemplate";
import DaftarBooking from "@/app/components/(Admin)/DaftarBooking";
import { getPromo } from "@/app/prisma/promo";
import { getReservation } from "@/app/prisma/reservation";
import { getRoom, getRoomByDate, getRoomExceptInv } from "@/app/prisma/room";

const DaftarBookingPage = async () => {
  const dataBooking = await getReservation();
  const listkamar = await getRoom();
  const promo = await getPromo();
  // console.log(listkamar);
  async function changeDateHandler(date, invoice) {
    "use server"
    date = new Date(date);
    const listbooking = await getRoomExceptInv(date, invoice);
    console.log('changeDateHandler - \n'+listbooking);
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

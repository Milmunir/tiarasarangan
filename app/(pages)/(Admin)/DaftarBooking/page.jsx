import AdminTemplate from "@/app/(templates)/(Admin)/AdminTemplate";
import DaftarBooking from "@/app/components/(Admin)/DaftarBooking";
import { getReservation } from "@/app/prisma/reservation";
import { PrismaClient } from "@prisma/client";

const DaftarBookingPage = async () => {
  const dataBooking = await getReservation();

  return (
    <>
      <AdminTemplate>
        <DaftarBooking list={dataBooking} />
      </AdminTemplate>
    </>
  );
};

export default DaftarBookingPage;

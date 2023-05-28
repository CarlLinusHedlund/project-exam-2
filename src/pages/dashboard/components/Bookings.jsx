import { PropTypes } from "prop-types";
import {
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  useGetOwnersBookingsQuery,
} from "../../../store/modules/ApiSlice";
import { useState } from "react";
import { DeleteSvg } from "../../../components/DynamicSvgs";
import { AnimatePresence, motion } from "framer-motion";
import { format, differenceInDays } from "date-fns";
import { Link } from "react-router-dom";
import "./tableStyling.css";

export function StatusSelectInput({ booking }) {
  const [status, setStatus] = useState(booking.status);
  const [updateBookingStatus] = useUpdateBookingStatusMutation();
  return (
    <select
      value={status}
      onChange={(e) => {
        setStatus(e.target.value);
        updateBookingStatus({
          status: e.target.value,
          bookingId: booking.booking_id,
        });
      }}
      className={`flex w-fit items-center justify-center rounded-full p-1 px-2 font-medium capitalize ${
        status === "confirmed"
          ? "bg-green-300 text-green-800"
          : status === "canceled"
          ? "bg-red-300 text-red-900"
          : status === "pending"
          ? "bg-yellow-300 text-yellow-900"
          : "bg-gray-300 text-gray-900"
      }`}
    >
      <option
        className="bg-gray-200 font-medium text-gray-700"
        value={"pending"}
      >
        pending
      </option>
      <option
        className=" bg-green-300 font-medium text-green-900 "
        value={"confirmed"}
      >
        confirmed
      </option>
      <option
        className="bg-red-400 font-medium text-red-900"
        value={"canceled"}
      >
        canceled
      </option>
    </select>
  );
}

export function BookingsTable({ bookings, deleteBooking }) {
  if (bookings) {
    if (bookings.length === 0) {
      return (
        <div className="mt-10 text-gray-700">
          Your venues has no bookings yet..
        </div>
      );
    }

    if (bookings.length > 0)
      return (
        <table className="mt-10 w-full">
          <thead>
            <tr className="relative text-left pr-10">
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Venue
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Booked by
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                status
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Total Price
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Created
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                No. Of Nights
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Booked From
              </th>
              <th className="font-poppins pr-10 whitespace-nowrap text-sm font-semibold text-primaryDark">
                Booked To
              </th>
              <th className="font-poppins text-sm font-semibold text-[#4B5563] h-full sticky bg-primaryWhite right-0 bottom-0 top-0 px-5 whitespace-nowrap ">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {bookings.map((booking, index) => {
                const created_at = format(
                  new Date(booking.created_at),
                  "dd.MM.yyyy HH:mm"
                );
                const BookingStartDate = format(
                  new Date(booking.booking_start_date),
                  "dd.MM.yyyy"
                );
                const BookingEndDate = format(
                  new Date(booking.booking_end_date),
                  "dd.MM.yyyy"
                );

                return (
                  <motion.tr
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    exit={{ opacity: 0, y: -20 }}
                    key={index}
                    className="border-b relative border-[#E2E8F0]"
                  >
                    <td className="py-4 pr-10 whitespace-nowrap max-w-[150px] text-ellipsis overflow-hidden text-[14px]">
                      <Link to={`/venue/${booking.venue_id}`}>
                        {booking.venue_title}
                      </Link>
                    </td>
                    <td className="py-4 text-[14px]">{booking.name}</td>
                    <td className="pr-4 text-[14px]">
                      <StatusSelectInput booking={booking} />
                    </td>

                    <td className="py-4 text-[14px]">
                      {booking.total_price.toFixed(2)} NOK
                    </td>
                    <td className="py-4 pr-4 text-[14px] whitespace-nowrap">
                      {created_at}
                    </td>
                    <td className="py-4 text-[14px]">
                      {differenceInDays(
                        new Date(booking.booking_end_date),
                        new Date(booking.booking_start_date)
                      )}
                    </td>
                    <td className="py-4">{BookingStartDate}</td>
                    <td className="py-4">{BookingEndDate}</td>
                    <td className=" bg-primaryWhite sticky right-0 top-0 bottom-0 py-4 px-6 h-full ">
                      <div onClick={() => deleteBooking(booking.booking_id)}>
                        <DeleteSvg color="#252525" width="15px" height="15px" />
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      );
  }

  return <div>loading...</div>;
}

export default function Bookings({ owner_id }) {
  const { data, isLoading } = useGetOwnersBookingsQuery(owner_id);
  const [deleteBooking] = useDeleteBookingMutation();
  if (isLoading)
    return (
      <div className="pt-20 animate-pulse w-full text-center">Loading...</div>
    );

  return (
    <div className="flex w-full flex-col gap-6 mt-10">
      <h1 className="text-xl font-bold">All Your Bookings({data.length})</h1>
      <div className="max-w-[900px] overflow-x-scroll table-container">
        <BookingsTable deleteBooking={deleteBooking} bookings={data} />
      </div>
    </div>
  );
}

StatusSelectInput.propTypes = {
  booking: PropTypes.object,
};

BookingsTable.propTypes = {
  bookings: PropTypes.array,
  deleteBooking: PropTypes.func,
};

Bookings.propTypes = {
  owner_id: PropTypes.string.isRequired,
};

import PropTypes from "prop-types";

export default function CheckNextBooking({ bookings }) {
  const daysBetween = (date1, date2) =>
    Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  // Get the nearest booking start date in the future
  const now = new Date();

  const nearestBookingStartDate = bookings.filter((booking) => {
    const start = new Date(booking.booking_start_date);
    const end = new Date(booking.booking_end_date);

    return start && end;
  });

  // if (nearestBookingStartDate.length === 0) {
  //   console.log("Available");
  // } else {
  //   console.log("Not available");
  // }

  console.log("nearestBookingStartDate: ", nearestBookingStartDate);

  // .sort((a, b) =>
  //   new Date(a.booking_start_date) > new Date(b.booking_start_date) ? 1 : -1
  // )[0]?.booking_start_date;

  // .sort(
  //   (a, b) => new Date(a.booking_start_date) - new Date(b.booking_start_date)
  // )
  // .map((booking) => new Date(booking.booking_start_date))[0];

  console.log("nearestBookingStartDate: ", nearestBookingStartDate);

  // Calculate the number of days between now and the nearest booking start date
  const daysUntilNextBooking =
    nearestBookingStartDate &&
    daysBetween(now, new Date(nearestBookingStartDate));
  console.log("daysUntilNextBooking: ", daysUntilNextBooking);

  // Determine the availability status
  const availabilityStatus =
    daysUntilNextBooking === undefined
      ? "Available Now"
      : daysUntilNextBooking <= 5
      ? `Available for ${daysUntilNextBooking} days`
      : "Available Now";

  return availabilityStatus;
}

CheckNextBooking.propTypes = {
  bookings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

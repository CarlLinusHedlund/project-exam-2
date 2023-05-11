import { useMediaQuery } from "react-responsive";
import "./index.css";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import CheckNextBooking from "./CheckNextBooking";
import GuestCounter from "./GuestCounter";

export default function Booking({ price, bookings }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const bookingRef = useRef(null);
  const [openDate, setOpenDate] = useState(false);
  console.log("bookings: ", bookings);
  console.log("openDate: ", openDate);

  const defaultSelected = {
    from: new Date(),
    to: "",
  };
  const [range, setRange] = useState(defaultSelected);
  useEffect(() => {
    // When range.from and range.to are both set,
    // set openDate to true and close the calendar
    console.log("UseEffect is running");
    if (range && range.from && range.to) {
      // add null check for range
      setOpenDate(false);
    }
  }, [range]);

  function Calendar() {
    const disabledDays = bookings.map((booking) => {
      return {
        from: new Date(booking.booking_start_date),
        to: new Date(booking.booking_end_date),
      };
    });

    return (
      <div
        onMouseLeave={OpenDate}
        className="flex flex-row z-30 p-10 delay-75 "
      >
        <DayPicker
          showOutsideDays
          defaultMonth={new Date()}
          mode="range"
          numberOfMonths={1}
          selected={range}
          onSelect={setRange}
          disabled={disabledDays}
          classNames={classNames}
        />
      </div>
    );
  }

  const handleBooking = () => {
    if (isMobile) {
      if (bookingOpen) {
        setBookingOpen(false);
        console.log("Make a request!!");
        console.log("Close booking");
      } else {
        setBookingOpen(true);
        console.log("open booking");
      }
    }
  };

  const OpenDate = () => {
    setOpenDate(!openDate);
  };

  const classNames = {
    vhidden: "sr-only",
    caption: "flex justify-center items-center h-10",
    root: "text-gray-800",
    months: "flex gap-10 relative px-4",
    caption_label: "text-xl px-1",
    nav_button:
      "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
    nav_button_next: "right-0",
    nav_button_previous: "left-0",
    table: "border-collapse border-spacing-0",
    head_cell: "w-10 h-10 uppercase align-middle text-center",
    cell: "w-10 h-10 align-middle text-center border-0 px-0",
    day: "rounded-full w-10 h-10 transition-colors hover:border hover:border-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-[#FF004D] active:text-white",
    day_selected: "text-white bg-[#E0736D] hover:bg-pink-700 duration-500",
    day_today: "font-bold",
    day_disabled:
      "opacity-25 hover:border-0 line-through hover:bg-white active:bg-white active:text-gray-800",
    day_outside: "enabled:opacity-50 ",
    day_range_middle: "rounded-none",
    day_range_end: "rounded-l-none rounded-r-full",
    day_range_start: "rounded-r-none rounded-l-full",
    day_hidden: "hidden",
  };

  return (
    <>
      {bookingOpen && isMobile && (
        <div
          onClick={() => setBookingOpen(false)}
          ref={bookingRef}
          className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000039] h-full w-screen z-30"
        ></div>
      )}
      <div
        className={
          isMobile
            ? "font-poppins bookingShadow fixed bottom-0 right-0 left-0 bg-primaryWhite h-20 w-full z-40"
            : "font-poppins shadow-lg bg-primaryWhite md:col-span-3 border-[1px] border-gray-100 md:col-start-5 md:row-span-4 md:row-start-1 md:row-end-4 rounded-[10px] h-full p-3 lg:p-8 "
        }
      >
        <div
          className={
            isMobile
              ? `w-full bg-primaryWhite ${
                  bookingOpen ? "h-[150px] py-10 " : "py-0 h-0"
                } duration-300 overflow-hidden fixed bottom-20 px-5 `
              : "w-full h-full flex flex-col justify-between relative items-center  "
          }
        >
          {!isMobile && (
            <h3 className="text-primaryDark w-full flex items-center justify-start font-medium text-[28px]">
              NOK {price}
              <span className="text-[16px] text-gray-300">/night</span>
            </h3>
          )}

          <div
            className={`${
              openDate
                ? "top-0 left-0 right-0 bottom-0 h-full w-full absolute z-20 flex justify-center items-center bg-primaryWhite "
                : "hidden"
            } `}
          >
            <Calendar />
            {/* <p onClick={OpenDate}>close</p> */}
          </div>

          <div className="flex flex-col cursor-pointer w-full">
            <div
              onClick={OpenDate}
              className="flex items-center justify-around gap-5 border-[1px] w-full py-3 border-gray-300 relative rounded-[10px] before:absolute before:w-[1px] before:bg-gray-300 before:h-full "
            >
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setRange({
                    from: "",
                    to: "",
                  });
                }}
                className="cursor-pointer text-primaryDark hover:scale-105 duration-150 absolute right-2 -top-8"
              >
                Reset
              </button>
              <label
                className="flex cursor-pointer flex-col text-center justify-center items-center text-[14px] smd:text-[16px] uppercase w-fit "
                htmlFor="checkin"
              >
                Check In
                <input
                  name="checkin"
                  className="text-[12px] text-center bg-primaryWhite "
                  disabled
                  value={
                    range && range.from ? format(range.from, "yyyy-MM-dd") : ""
                  }
                  type="date"
                />
              </label>
              <label
                className="flex flex-col text-center justify-center items-center text-[14px] smd:text-[16px] uppercase w-fit "
                htmlFor="checkout"
              >
                checkout
                <input
                  name="checkout"
                  className="text-center   text-[12px] bg-primaryWhite"
                  disabled
                  value={
                    range && range.to ? format(range.to, "yyyy-MM-dd") : ""
                  }
                  type="date"
                />
              </label>
            </div>
            <GuestCounter />
          </div>

          {!isMobile && (
            <button
              onClick={handleBooking}
              className=" w-full h-12 bg-primaryCoral py-[11px] max-w-md text-[16px] rounded-[10px] "
            >
              BOOK NOW
            </button>
          )}
        </div>
        {isMobile && (
          <>
            <div className="flex items-center justify-between h-20 w-full px-4 gap-5 xs:gap-10 z-10">
              <div className=" flex flex-col w-fit ">
                <p className="whitespace-nowrap font-semibold text-[18px]  ">
                  NOK {price}
                  <span className="text-[12px] text-gray-400 ">
                    /night
                  </span>{" "}
                </p>
                <p className="text-[10px] text-gray-400 ">
                  <CheckNextBooking bookings={bookings} />
                </p>
              </div>
              <button
                onClick={handleBooking}
                className=" w-full bg-primaryCoral py-[11px] max-w-md text-[16px] rounded-[10px] "
              >
                BOOK NOW
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

Booking.propTypes = {
  price: PropTypes.number.isRequired,
  bookings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

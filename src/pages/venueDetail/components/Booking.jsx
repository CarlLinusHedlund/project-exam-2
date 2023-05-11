import { useMediaQuery } from "react-responsive";
import "./index.css";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import CheckNextBooking from "./CheckNextBooking";

export default function Booking({ price, bookings }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const bookingRef = useRef(null);
  const [openDate, setOpenDate] = useState(false);
  console.log("bookings: ", bookings);
  console.log("openDate: ", openDate);

  function Example({ size }) {
    const disabledDays = bookings.map((booking) => {
      return {
        from: new Date(booking.booking_start_date),
        to: new Date(booking.booking_end_date),
      };
    });

    const defaultSelected = {
      from: new Date(),
      to: "",
    };

    const [range, setRange] = useState(defaultSelected);

    return (
      <div className="flex flex-row z-30 delay-75 ">
        <DayPicker
          defaultMonth={new Date()}
          mode="range"
          numberOfMonths={size}
          selected={range}
          onSelect={setRange}
          disabled={disabledDays}
          classNames={class}
          // footer={footer}
        />
      </div>
    );
  }
  Example.propTypes = {
    size: PropTypes.number.isRequired,
  };

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
            : "font-poppins bookingShadowDesktop bg-primaryWhite md:col-span-3 md:col-start-5 md:row-span-4 md:row-start-1 md:row-end-4 rounded-[10px] h-full p-3 lg:p-8 "
        }
      >
        <div
          className={
            isMobile
              ? `w-full bg-primaryWhite ${
                  bookingOpen ? "h-[60vh]" : "h-0"
                } duration-300 overflow-hidden fixed bottom-20`
              : "w-full h-full flex flex-col justify-between relative items-center "
          }
        >
          {!isMobile && (
            <h3 className="text-primaryDark w-full flex items-center justify-start font-medium text-[28px]">
              NOK {price}
              <span className="text-[16px] text-gray-300">/night</span>
            </h3>
          )}
          {/* {openDate && (
            <div className="absolute top-0 left-0 bottom-0 right-0 duration-300 z-20 bg-white opacity-25"></div>
          )} */}
          <div
            className={`${
              openDate
                ? "top-0 left-0 right-0 bottom-0 h-full w-full absolute z-20 flex justify-center items-center bg-primaryWhite "
                : "hidden"
            } `}
          >
            <Example size={1} />
          </div>
          <div className="flex flex-col w-full">
            <p className="pl-2">Date</p>
            <div
              onClick={OpenDate}
              className="flex items-center justify-around gap-5 border-[1px] w-full py-3 border-gray-300 relative rounded-[10px] before:absolute before:w-[1px] before:bg-gray-300 before:h-full "
            >
              <label
                className="flex flex-col text-center justify-center items-center text-[20px] uppercase w-fit "
                htmlFor="checkin"
              >
                Check In
                <input
                  name="checkin"
                  className="text-center text-[14px]"
                  disabled
                  value={"2017-06-01"}
                  type="date"
                />
              </label>
              <label
                className="flex flex-col text-center justify-center items-center text-[16px] smd:text-[20px] uppercase w-fit "
                htmlFor="checkout"
              >
                checkout
                <input
                  name="checkout"
                  className="text-center text-[14px]"
                  disabled
                  value={"2017-06-01"}
                  type="date"
                />
              </label>
            </div>
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

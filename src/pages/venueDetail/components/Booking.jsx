import { useMediaQuery } from "react-responsive";
import "./index.css";
import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import CheckNextBooking from "./CheckNextBooking";
import GuestCounter from "./GuestCounter";
import WifiSvg, {
  BreakfastSvg,
  ParkingSvg,
  PetSvg,
} from "../../../components/MetaSvgs";
import Calendar from "./Calendar";

export default function Booking({ price, bookings, maxGuests, meta }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const bookingRef = useRef(null);
  const [openDate, setOpenDate] = useState(false);
  const defaultSelected = {
    from: "",
    to: "",
  };

  const [guests, setGuests] = useState(0);
  const [range, setRange] = useState(defaultSelected);
  console.log("range", range);
  useEffect(() => {
    // When range.from and range.to are both set,
    // set openDate to true and close the calendar
    if (range && range.from && range.to) {
      // add null check for range
      setOpenDate(false);
    }
  }, [range]);

  const handleBooking = () => {
    if (isMobile) {
      if (bookingOpen) {
        setBookingOpen(false);
      } else {
        setBookingOpen(true);
      }
    }
    if (!isMobile) {
      console.log(range);
      console.log(guests);
      console.log("Make a request!!");
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
            : "font-poppins shadow-lg bg-primaryWhite md:col-span-3 border-[1px] border-gray-100 md:col-start-5 md:row-span-4 md:row-start-1 md:row-end-4 rounded-[10px] h-full pt-5 mt-5 p-8 "
        }
      >
        <div
          className={
            isMobile
              ? `w-full bg-primaryWhite ${
                  bookingOpen
                    ? "min-h-fit max-h-[450px] h-[60vh]  py-10 px-4 "
                    : "px-0 py-0 h-0"
                } duration-300 overflow-hidden fixed bottom-20 px-5 `
              : "w-full h-full flex flex-col justify-between relative items-center  "
          }
        >
          {!isMobile && (
            <div className="flex space-between items-center w-full pt-3 pb-10">
              <h3 className="text-primaryDark w-full flex items-center justify-start font-medium text-[18px]">
                NOK {price}
                <span className="text-[16px] text-gray-300">/night</span>
              </h3>
              <div className="px-1 h-fit flex gap-4">
                <div className="relative">
                  {!meta.wifi && (
                    <div
                      className="absolute rounded-2xl w-[120%] h-px bg-gray-300 transform -rotate-45 origin-top-left"
                      style={{
                        left: "10%",
                        top: "100%",
                        marginTop: "-1px",
                      }}
                    ></div>
                  )}
                  <WifiSvg color={meta.wifi ? "#252525" : "#DDDDDD"} />
                </div>
                <div className="relative">
                  {!meta.breakfast && (
                    <div
                      className="absolute rounded-2xl w-[120%] h-px bg-gray-300 transform -rotate-45 origin-top-left"
                      style={{
                        left: "10%",
                        top: "100%",
                        marginTop: "-1px",
                      }}
                    ></div>
                  )}

                  <BreakfastSvg
                    color={meta.breakfast ? "#252525" : "#DDDDDD"}
                  />
                </div>
                <div className="relative">
                  {!meta.pets && (
                    <div
                      className="absolute rounded-2xl w-[120%] h-px bg-gray-300 transform -rotate-45 origin-top-left"
                      style={{
                        left: "10%",
                        top: "100%",
                        marginTop: "-1px",
                      }}
                    ></div>
                  )}
                  <PetSvg color={meta.pets ? "#252525" : "#DDDDDD"} />
                </div>
                <div className="relative">
                  {!meta.parking && (
                    <div
                      className="absolute rounded-2xl w-[120%] h-px bg-gray-300 transform -rotate-45 origin-top-left"
                      style={{
                        left: "10%",
                        top: "100%",
                        marginTop: "-1px",
                      }}
                    ></div>
                  )}
                  <ParkingSvg color={meta.parking ? "#252525" : "#DDDDDD"} />
                </div>
              </div>
            </div>
          )}

          <div
            className={`${
              openDate
                ? "top-0 left-0 right-0 bottom-0 h-full w-full absolute z-20 flex justify-center items-center backdrop-blur-[2px] bg-[#ffffffd4]"
                : "hidden"
            } `}
          >
            <Calendar
              openDate={openDate}
              range={range}
              bookings={bookings}
              setRange={setRange}
              setOpenDate={setOpenDate}
            />
          </div>
          <div className="flex flex-col gap-10 cursor-pointer w-full">
            <div
              onClick={OpenDate}
              className="flex items-center justify-around gap-5 border-[1px] w-full py-3 border-gray-300 relative rounded-[10px] before:absolute before:w-[1px] before:bg-gray-300 before:h-full "
            >
              {range && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setRange(defaultSelected);
                  }}
                  className="cursor-pointer text-primaryDark text-[14px] hover:scale-105 duration-150 absolute right-2 -top-7 sm:-top-6 sm:text-[12px]"
                >
                  Reset
                </button>
              )}

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
            <GuestCounter setGuests={setGuests} maxGuests={maxGuests} />
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
  maxGuests: PropTypes.number.isRequired,
  meta: PropTypes.object.isRequired,
};

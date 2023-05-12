import { DayPicker } from "react-day-picker";
import PropTypes from "prop-types";
// import "react-day-picker/dist/style.css";
import { useAnimate } from "framer-motion";
import { useEffect } from "react";

function useMenuAnimation(openDate) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".calendar", openDate ? { opacity: 1 } : { opacity: 1 }, {
      duration: openDate ? 0.5 : 0.3,
    });
    animate(".root", openDate ? { opacity: 1 } : { opacity: 1 }, {
      duration: openDate ? 0.4 : 0.6,
      delay: openDate ? 0.2 : 0,
    });
  }, [openDate, animate]);

  return scope;
}

export default function Calendar({
  setRange,
  bookings,
  range,
  setOpenDate,
  openDate,
}) {
  console.log("Range calendar: ", range);
  const scope = useMenuAnimation(openDate);

  const disabledDays = [
    {
      before: new Date(),
    },
    ...(bookings && bookings.length
      ? bookings.map((booking) => {
          return {
            from: new Date(booking.booking_start_date),
            to: new Date(booking.booking_end_date),
          };
        })
      : []),
  ];

  const classNames = {
    vhidden: "sr-only",
    caption: "flex justify-center items-center h-10",
    root: " root text-gray-800 p-10",
    months: "flex gap-10 relative px-4",
    caption_label: "text-xl px-1",
    nav_button:
      "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
    nav_button_next: "right-0",
    nav_button_previous: "left-0",
    table: "border-collapse border-spacing-0",
    head_cell: "w-10 h-10 uppercase align-middle text-center",
    cell: "w-10 h-10 align-middle text-center border-0 px-0",
    day: "rounded-full w-10 h-10 transition-colors hover:border focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-[#FF004D] active:text-white",
    day_selected: "text-white bg-[#E0736D] duration-500 hover:bg-pink-500",
    day_today: "font-bold text-primaryCoral text-[22px]",
    day_disabled:
      "opacity-25 hover:border-0 line-through hover:bg-white active:bg-white active:text-gray-800",
    day_outside: "",
    day_range_middle: "rounded-none",
    day_range_end: "rounded-l-none rounded-r-full",
    day_range_start: "rounded-r-none rounded-l-full",
    day_hidden: "hidden",
  };

  // const classNames = {
  //   vhidden: "sr-only",
  //   caption: "flex justify-center items-center h-10",
  //   root: " root text-gray-800",
  //   months: "flex gap-10 relative px-4",
  //   caption_label: "text-xl px-1",
  //   nav_button:
  //     "inline-flex justify-center items-center absolute top-0 w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100",
  //   nav_button_next: "right-0",
  //   nav_button_previous: "left-0",
  //   table: "border-collapse border-spacing-0",
  //   head_cell: "w-10 h-10 uppercase align-middle text-center",
  //   cell: "w-10 h-10 align-middle text-center border-0 px-0",
  //   day: "rounded-full w-10 h-10 transition-colors hover:border hover:border-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-sky-300 focus-visible:ring-opacity-50 active:bg-[#FF004D] active:text-white",
  //   day_selected: "text-white bg-[#E0736D] hover:bg-pink-700",
  //   day_today: "font-bold text-[22px]",
  //   day_disabled:
  //     "opacity-25 hover:border-0 line-through hover:bg-white active:bg-white active:text-gray-800",
  //   day_outside: "enabled:opacity-50 ",
  //   day_range_middle: "rounded-none",
  //   day_range_end: "rounded-l-none rounded-r-full",
  //   day_range_start: "rounded-r-none rounded-l-full",
  //   day_hidden: "hidden",
  // };

  return (
    <div
      ref={scope}
      onMouseLeave={() => setOpenDate(false)}
      className=" flex w-full justify-center items-center flex-row z-30 relative "
    >
      <img
        className="absolute top-3 right-5"
        onClick={() => setOpenDate(false)}
        src="../close.svg"
        alt="exit"
      />
      <DayPicker
        showOutsideDays
        defaultMonth={new Date()}
        mode="range"
        numberOfMonths={1}
        selected={range}
        onSelect={setRange}
        disabled={disabledDays.length > 0 && disabledDays}
        className={`calendar ${openDate ? "" : "hidden"} `}
        classNames={classNames}
      />
    </div>
  );
}

Calendar.propTypes = {
  setRange: PropTypes.func.isRequired,
  bookings: PropTypes.arrayOf(PropTypes.object).isRequired,
  range: PropTypes.object,
  setOpenDate: PropTypes.func.isRequired,
  openDate: PropTypes.bool.isRequired,
};

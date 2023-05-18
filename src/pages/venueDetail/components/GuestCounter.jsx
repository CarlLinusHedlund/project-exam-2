import { useState } from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export default function GuestCounter({ maxGuests, setGuests }) {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const handleAdultIncrement = () => {
    if (adults + children < maxGuests) {
      setAdults(adults + 1);
      setGuests(adults + children);
    }
  };

  const handleAdultDecrement = () => {
    if (adults > 0) {
      setAdults(adults - 1);
      setGuests(adults + children);
    }
  };

  const handleChildIncrement = () => {
    if (adults + children < maxGuests) {
      setChildren(children + 1);
      setGuests(adults + children);
    }
  };

  const handleChildDecrement = () => {
    if (children > 0) {
      setChildren(children - 1);
      setGuests(adults + children);
    }
  };

  useEffect(() => {
    setGuests(adults + children);
  }, [adults, children, setGuests]);

  return (
    <>
      <label htmlFor="guestCounter">
        <div
          name="guestcounter"
          className="w-full text-primaryDark flex flex-col gap-3 "
        >
          <div className="w-full flex justify-between items-center py-2 px-4 border-[1px] rounded-[10px] border-gray-300">
            <div className="flex flex-col gap-0">
              <p className="text-[14px] font-medium ">Adults</p>
              <p className=" text-[12px] font-light text-gray-400 ">Over 15</p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                className={`${adults === 0 ? "text-gray-300" : ""} text-[24px]`}
                onClick={handleAdultDecrement}
                disabled={adults === 0}
              >
                -
              </button>
              <span className="w-4 text-center font-light ">{adults}</span>
              <button
                className={`${
                  adults + children === maxGuests ? "text-gray-300" : ""
                } text-[22px] font-medium `}
                onClick={handleAdultIncrement}
                disabled={adults + children === maxGuests}
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full flex justify-between items-center py-2 px-4 border-[1px] rounded-[10px] border-gray-300">
            <div className="">
              <p className="text-[14px] font-medium ">Children</p>
              <p className="text-[12px] font-light text-gray-400 ">Under 14</p>
            </div>
            <div className="flex  items-center gap-2">
              <button
                className={`${
                  children === 0 ? "text-gray-300" : ""
                } text-[24px]  `}
                onClick={handleChildDecrement}
                disabled={children === 0}
              >
                -
              </button>
              <span className="w-4 text-center font-light ">{children}</span>
              <button
                className={`${
                  adults + children === maxGuests ? "text-gray-300" : ""
                } text-[22px] font-medium `}
                onClick={handleChildIncrement}
                disabled={adults + children === maxGuests}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </label>
    </>
  );
}

GuestCounter.propTypes = {
  maxGuests: PropTypes.number.isRequired,
  setGuests: PropTypes.func.isRequired,
};

import { useState } from "react";

export default function GuestCounter() {
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [count] = useState(adults + kids);

  return (
    <>
      <label htmlFor="guestCounter">
        Guests
        <div name="guestcounter" className="w-full flex flex-col gap-3 ">
          <div className="w-full flex justify-between items-center">
            <div className="">
              <p className="">Adults</p>
              <p className="">Over 15</p>
            </div>
            <div className="flex gap-2">
              <div onClick={() => setAdults(1 - adults)} className="">
                -
              </div>
              <div className="">{adults}</div>
              <div onClick={() => setAdults(adults + 1)} className="">
                +
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between items-center">
            <div className="">
              <p className="">Children</p>
              <p className="">Under 14</p>
            </div>
            <div className="flex gap-2">
              <div onClick={() => setKids(1 - adults)} className="">
                -
              </div>
              <div className="">{kids}</div>
              <div onClick={() => setKids(adults + 1)} className="">
                +
              </div>
            </div>
          </div>
          <div>Total guests: {count}</div>
        </div>
      </label>
    </>
  );
}

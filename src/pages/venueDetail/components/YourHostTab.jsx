import PropTypes from "prop-types";
// import { useState } from "react";
// import { useEffect } from "react";
// import { supabase } from "../../../utils/Supabase";

export default function YourHostTab({ host }) {
  console.log("host from yourhosttab: ", host);

  return (
    <div className="pt-10 w-full h-fit">
      {host && (
        <div className="w-full p-3 sm:p-10 rounded-[10px] flex flex-col sm:flex-row sm:flex-wrap smd:flex-col lg:flex-row gap-10 items-center smd:items-center sm:items-start lg:items-start  ">
          <div className="flex gap-10">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-fit h-fit ">
                {host[0].profile_img ? (
                  <img
                    className="rounded-full w-24 h-24 md:w-32 md:h-32 object-cover"
                    src={host[0].profile_img}
                    alt={`profile image of${host[0].name}`}
                  />
                ) : (
                  <div className="rounded-full flex items-center justify-center capitalize text-[40px] bg-red-400 w-32 h-32">
                    {host[0].name[0]}
                  </div>
                )}
                <div
                  className={` absolute flex items-center justify-center bottom-4 -right-2 w-10 h-10 ${
                    host[0].profile_img ? "bg-primaryCoral" : "bg-primaryDark"
                  } rounded-full`}
                >
                  <img className="w-5 h-5" src="../secure.png" alt="secure" />
                </div>
              </div>
              <p className="text-[12px] md:text-[16px] font-semibold ">
                {host[0].name}
              </p>
            </div>
            <div className="flex flex-col ">
              <div className=" border-b-[1px] border-gray-200 pb-2 pr-3 md:pr-10 ">
                <p className="text-[20px] font-bold">2</p>
                <p className="text-[12px] font-medium">Venues</p>
              </div>
              <div className=" border-b-[1px] border-gray-200 pb-2 pr-3 md:pr-10 ">
                <p className="text-[20px] font-bold">4.6</p>
                <p className="text-[12px] font-medium">Average rating</p>
              </div>
              <div className=" pb-2 pr-3 md:pr-10 ">
                <p className="text-[20px] font-bold">1</p>
                <p className="text-[12px] font-medium">Year as member</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-[18px] font-semibold">About Me</h3>
            <p className=" text-sm ">{host[0].about_me}</p>
          </div>
        </div>
      )}
    </div>
  );
}

YourHostTab.propTypes = {
  host: PropTypes.array,
};

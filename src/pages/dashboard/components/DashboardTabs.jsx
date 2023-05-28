import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  FeaturesSvg,
  LocationPinSvg,
  YourHostSvg,
} from "../../../components/DynamicSvgs";

import { useState } from "react";
import UserVenues from "./UserVenues";
import Bookings from "./Bookings";
import Performance from "./Performance";

export default function DashboardTabs({ owner_id }) {
  const allIngredients = [
    { label: "Venues", content: <UserVenues owner_id={owner_id} /> },
    {
      label: "Bookings",
      content: <Bookings owner_id={owner_id} />,
    },
    { label: "Performance", content: <Performance /> },
  ];

  const [selectedTab, setSelectedTab] = useState(allIngredients[0]);
  return (
    <>
      <div className=" font-poppins list-none flex gap-5 justify-around sm:justify-start xs:gap-10 pt-10 ">
        {allIngredients.map((item, index) => (
          <li
            key={item.label + index}
            className={` flex gap-1 items-center text-[12px] smd:text-[16px] font-semibold cursor-pointer ${
              item.label === selectedTab.label
                ? "selected relative text-primaryCoral "
                : " text-[#C1C1C1]"
            }`}
            onClick={() => setSelectedTab(item)}
          >
            {item.label === "Venues" && (
              <LocationPinSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#C1C1C1"}
              />
            )}
            {item.label === "Bookings" && (
              <YourHostSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#C1C1C1"}
              />
            )}
            {item.label === "Your Bookings" && (
              <FeaturesSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#A7A7A7"}
              />
            )}
            {item.label === "Performance" && (
              <FeaturesSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#A7A7A7"}
              />
            )}
            {item.label}
            {item.label === selectedTab.label && (
              <motion.div
                className="absolute -bottom-[4px] left-0 rounded-full  w-[30px] bg-primaryCoral h-[3px]  "
                layoutId="underline"
              />
            )}
          </li>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          className="h-[600px]"
          key={selectedTab ? selectedTab.label : "empty"}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTab ? selectedTab.content : "😋"}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

DashboardTabs.propTypes = {
  owner_id: PropTypes.string.isRequired,
};

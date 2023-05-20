import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  FeaturesSvg,
  LocationPinSvg,
  YourHostSvg,
} from "../../../components/DynamicSvgs";
import FeaturesTab from "./FeaturesTab";
import LocationTab from "./LocationTab";
import YourHostTab from "./YourHostTab";
import { useGetUserQuery } from "../../../store/modules/ApiSlice";

export default function Tabs({ meta, owner }) {
  const { data: host } = useGetUserQuery(owner);

  const allIngredients = [
    { label: "Location", content: <LocationTab /> },
    {
      label: "Amenities",
      content: <FeaturesTab meta={meta} />,
    },
    { label: "Meet your host", content: <YourHostTab host={host} /> },
  ];

  const [selectedTab, setSelectedTab] = useState(allIngredients[0]);

  return (
    <>
      <div className=" font-poppins list-none flex gap-5 xs:gap-10 pt-10 ">
        {allIngredients.map((item) => (
          <li
            key={item.label}
            className={` flex gap-1 items-center text-[12px] md:text-[16px] font-semibold cursor-pointer ${
              item.label === selectedTab.label
                ? "selected relative text-primaryCoral "
                : " text-[#C1C1C1]"
            }`}
            onClick={() => setSelectedTab(item)}
          >
            {item.label === "Location" && (
              <LocationPinSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#C1C1C1"}
              />
            )}
            {item.label === "Meet your host" && (
              <YourHostSvg
                color={item.label === selectedTab.label ? "#E0736D" : "#C1C1C1"}
              />
            )}
            {item.label === "Amenities" && (
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

Tabs.propTypes = {
  meta: PropTypes.object,
  owner: PropTypes.string,
};

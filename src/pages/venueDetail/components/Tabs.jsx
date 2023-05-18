import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import HomeSvg from "../../../components/DynamicSvgs";

function Location() {
  return "Location";
}

function Features() {
  return "Features";
}

function YourHost() {
  return "You Host";
}

const allIngredients = [
  { label: "Location", content: <Location /> },
  { label: "Features", content: <Features /> },
  { label: "Your host", content: <YourHost /> },
];

export default function Tabs() {
  const [selectedTab, setSelectedTab] = useState(allIngredients[0]);
  console.log(selectedTab);

  return (
    <>
      <div className=" list-none flex gap-10 ">
        {allIngredients.map((item) => (
          <li
            key={item.label}
            className={` flex gap-2 items-center ${
              item === selectedTab ? "selected relative text-primaryCoral " : ""
            }`}
            onClick={() => setSelectedTab(item)}
          >
            <HomeSvg
              color={item.label === selectedTab.label ? "#E0736D" : "#A7A7A7"}
            />{" "}
            {item.label}
            {item === selectedTab && (
              <motion.div
                className="absolute -bottom-[1px] left-0 w-1/2 bg-primaryCoral h-[1px]  "
                layoutId="underline"
              />
            )}
          </li>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
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

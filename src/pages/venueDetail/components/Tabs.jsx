import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const allIngredients = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
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
            className={item === selectedTab ? "selected" : ""}
            onClick={() => setSelectedTab(item)}
          >
            {`${item.icon} ${item.label}`}
            {item === selectedTab && (
              <motion.div className="underline" layoutId="underline" />
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
          {selectedTab ? selectedTab.icon : "😋"}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

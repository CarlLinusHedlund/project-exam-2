import { useEffect, useState } from "react";
import DesktopHeader from "./components/desktopHeader";
import { motion, useScroll } from "framer-motion";
import MobileHeader from "./components/mobileHeader";

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  function update() {
    if (scrollY?.current < scrollY?.prev) {
      setHidden(false);
    } else if (scrollY?.current > 300 && scrollY?.current > scrollY?.prev) {
      setHidden(true);
    }
  }

  useEffect(() => {
    return scrollY.onChange(() => update());
  });

  const headerVariants = {
    hidden: { y: -90 },
  };

  return (
    <motion.div
      variants={headerVariants}
      animate={hidden ? "hidden" : "visible"}
      className=" header1 w-full sticky top-0 left-0 right-0 h-[75px] md:h-[90px] z-30 backdrop-blur-[2px]	 "
    >
      <DesktopHeader />
      <MobileHeader />
    </motion.div>
  );
}

import { useContext, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import MobileHeader from "./components/MobileHeader";
import DesktopHeader from "./components/DesktopHeader";
import { UserContext } from "../auth/utils/UserContext";

export default function Header() {
  const user = useContext(UserContext);
  //Fot the header to disappear and come back
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
  //Fot the header to disappear and come back

  //Sign in modal context. If true remove possiblilty to scroll in the background

  //Sign in modal context. If true remove possiblilty to scroll in the background

  const [isMobileScreen, setIsMobileScreen] = useState(
    window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.matchMedia("(max-width: 767px)").matches);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      variants={headerVariants}
      animate={hidden ? "hidden" : "visible"}
      className=" header1 w-full sticky top-0 left-0 right-0 h-[75px] md:h-[90px] z-30 bg-[#fafafa] backdrop-blur-[8px]"
    >
      {isMobileScreen ? (
        <MobileHeader user={user} />
      ) : (
        <DesktopHeader user={user} />
      )}
    </motion.div>
  );
}

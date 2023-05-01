import { useEffect, useState } from "react";
import DesktopHeader from "./components/desktopHeader";
import { motion, useScroll } from "framer-motion";
import MobileHeader from "./components/mobileHeader";
import { signInContext } from "../auth/utils/signInContext";
import SignInModal from "../auth/signIn";

export default function Header() {
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
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  console.log("Header file: ", signInModalOpen);
  if (signInModalOpen) {
    document.body.classList.add("signInDropdown");
  } else {
    document.body.classList.remove("signInDropdown");
  }
  //Sign in modal context. If true remove possiblilty to scroll in the background

  return (
    <signInContext.Provider value={[signInModalOpen, setSignInModalOpen]}>
      <motion.div
        variants={headerVariants}
        animate={hidden ? "hidden" : "visible"}
        className=" header1 w-full sticky top-0 left-0 right-0 h-[75px] md:h-[90px] z-30 backdrop-blur-[5px]"
      >
        <DesktopHeader />
        <MobileHeader />
      </motion.div>
      <SignInModal />
    </signInContext.Provider>
  );
}

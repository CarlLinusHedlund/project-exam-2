import { useEffect, useState } from "react";
import DesktopHeader from "./components/desktopHeader";
import { motion, useScroll } from "framer-motion";
import MobileHeader from "./components/mobileHeader";
import { SignInContext, SignUpContext } from "../auth/utils/authContext";
import SignInModal from "../auth/SignIn";
import SignUpModal from "../auth/SignUp";

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
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  console.log("Header file: ", signInModalOpen);

  if (signInModalOpen || signUpModalOpen) {
    document.body.classList.add("disableScroll");
  } else {
    document.body.classList.remove("disableScroll");
  }
  //Sign in modal context. If true remove possiblilty to scroll in the background

  return (
    <SignInContext.Provider value={[signInModalOpen, setSignInModalOpen]}>
      <SignUpContext.Provider value={[signUpModalOpen, setSignUpModalOpen]}>
        <motion.div
          variants={headerVariants}
          animate={hidden ? "hidden" : "visible"}
          className=" header1 w-full sticky top-0 left-0 right-0 h-[75px] md:h-[90px] z-30 backdrop-blur-[5px]"
        >
          <DesktopHeader />
          <MobileHeader />
        </motion.div>
        <SignInModal />
        <SignUpModal />
      </SignUpContext.Provider>
    </SignInContext.Provider>
  );
}

import { motion } from "framer-motion";
import VenuesNearby from "./components/VenuesNearby";
import BecomeAHost from "./components/BecomeAHost";
import Herobanner from "./components/Herobanner";
// import { SignInContext } from "../../components/auth/utils/AuthContext";
// import { useContext } from "react";

export default function Index() {
  // const [signInmodal, setSignInModal] = useContext(SignInContext);

  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className=" relative inner px-3 md:px-5 h-fit py-32 md:py-20 "
    >
      <Herobanner />
      <VenuesNearby />
      <BecomeAHost />
    </motion.div>
  );
}

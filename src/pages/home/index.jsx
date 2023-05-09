import { motion } from "framer-motion";
import Categories from "./components/Categories";
import VenuesNearby from "./components/VenuesNearby";
import BecomeAHost from "./components/BecomeAHost";
import Herobanner from "./components/Herobanner";
import SearchBarMobile from "../../components/search/SearchBarMobile";

export default function Index() {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className=" relative inner px-3 md:px-5 h-fit py-32 md:py-20 "
    >
      <SearchBarMobile />
      <Herobanner />
      <Categories />
      <VenuesNearby />
      <BecomeAHost />
    </motion.div>
  );
}

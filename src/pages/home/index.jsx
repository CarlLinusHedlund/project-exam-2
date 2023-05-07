import { motion } from "framer-motion";
import Herobanner from "./components/herobanner";

export default function Index() {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      className=" inner px-3 md:px-5 h-fit py-20 "
    >
      <Herobanner />
    </motion.div>
  );
}

import { motion } from "framer-motion";
import MultiStepForm from "./MultiStepForm";

export default function Publish() {
  return (
    <motion.div
      exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      className=" font-poppins w-full h-fit flex flex-col gap-10 md:pl-20 pt-10 pb-44 "
    >
      <motion.h1
        exit={{ opacity: 0, x: 10, transition: { duration: 0.3 } }}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        className=" px-3 font-semibold text-[25px] "
      >
        Publish a venue
      </motion.h1>
      <MultiStepForm />
    </motion.div>
  );
}

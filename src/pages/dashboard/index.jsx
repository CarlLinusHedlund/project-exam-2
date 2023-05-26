import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <motion.div
      className="inner flex relative gap-5 "
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <Dashboard />
    </motion.div>
  );
}

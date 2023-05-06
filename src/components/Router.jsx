import { Routes, Route, useLocation } from "react-router-dom";
import Index from "../pages";
import Listings from "../pages/listings";
import Dashboard from "../pages/dashboard";
import { AnimatePresence } from "framer-motion";

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/dashboard/profile" element={<Index />} />
        <Route path="/dashboard/messages" element={<Index />} />
        <Route path="/dashboard/become-a-host" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help-center" element={<Index />} />
      </Routes>
    </AnimatePresence>
  );
}

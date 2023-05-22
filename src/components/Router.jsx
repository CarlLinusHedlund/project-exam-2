import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import { AnimatePresence } from "framer-motion";
import Index from "../pages/home";
import VenueDetail from "../pages/venueDetail";
import { Venues } from "../pages/venues";

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:country?/:type?/:city?" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route path="/dashboard/profile" element={<Index />} />
        <Route path="/dashboard/messages" element={<Index />} />
        <Route path="/dashboard/become-a-host" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help-center" element={<Index />} />
      </Routes>
    </AnimatePresence>
  );
}

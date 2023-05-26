import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "../pages/home";
import VenueDetail from "../pages/venueDetail";
import { Venues } from "../pages/venues";
import DashboardLayout from "../pages/dashboard/components/DashboardLayout";
import Profile from "../pages/dashboard/components/Profile";
import Messages from "../pages/dashboard/components/Messages";
import Publish from "../pages/dashboard/components/Publish";
import Statistics from "../pages/dashboard/components/Statistics";
import Dashboard from "../pages/dashboard/components/Dashboard";
import AuthRoute from "./AuthRoute";

export default function Router() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/signIn" element={<Index />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:country?/:type?/:city?" element={<Venues />} />
        <Route path="/venue/:id" element={<VenueDetail />} />
        <Route element={<AuthRoute />}>
          <Route path="/dashboard/*" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="messages" element={<Messages />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="publish" element={<Publish />} />
          </Route>
        </Route>

        <Route path="/help-center" element={<Index />} />
      </Routes>
    </AnimatePresence>
  );
}

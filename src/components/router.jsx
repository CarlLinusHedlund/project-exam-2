import { Routes, Route } from "react-router-dom";
import Index from "../pages";
import Listings from "../pages/listings";
import Dashboard from "../pages/dashboard";

export default function Router() {
  return (
    <Routes key={location.pathname} location={location}>
      <Route path="/" element={<Index />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/dashboard/become-a-host" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

import { useLocation } from "react-router-dom";
import Nav from "../pages/dashboard/components/Nav";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Router from "./Router";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      {location.pathname.includes("/dashboard") && <Nav />}
      <Router />
      <Footer />
    </>
  );
}

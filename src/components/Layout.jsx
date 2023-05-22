import { useLocation } from "react-router-dom";
import Nav from "../pages/dashboard/components/Nav";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Router from "./Router";
import { useContext } from "react";
import { UserContext } from "./auth/utils/UserContext";

export default function Layout() {
  const { session } = useContext(UserContext);

  console.log(session);
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

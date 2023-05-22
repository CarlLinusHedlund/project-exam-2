import { useLocation } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Router from "./Router";

export default function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Router />
      {!location.pathname.includes("/dashboard") && <Footer />}
    </>
  );
}

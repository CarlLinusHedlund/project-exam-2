import Footer from "./footer/footer";
import Header from "./header/header";
import Router from "./router";

export default function Layout() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}

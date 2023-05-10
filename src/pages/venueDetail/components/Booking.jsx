import { useMediaQuery } from "react-responsive";
import BookingDesktop from "./BookingDesktop";
import BookingMobile from "./BookingMobile";

export default function Booking() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return <div>{isMobile ? BookingMobile : BookingDesktop}</div>;
}

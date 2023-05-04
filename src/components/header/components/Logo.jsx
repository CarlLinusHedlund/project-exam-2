import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="font-bold font-poppins">
      <span className="text-[33px] text-primaryCoral ">H</span>
      <span className="text-[25px] text-primaryDark ">olidaze</span>
    </Link>
  );
}

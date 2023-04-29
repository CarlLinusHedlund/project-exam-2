import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <>
      <nav className="flex justify-center items-center">
        <NavLink to="/" />
      </nav>
    </>
  );
}

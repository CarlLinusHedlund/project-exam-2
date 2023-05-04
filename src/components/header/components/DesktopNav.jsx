import { NavLink } from "react-router-dom";

export default function DesktopNav() {
  return (
    <nav className="flex gap-5 font-poppins text-[12px] lg:text-[14px]">
      <NavLink activeclassname="active" className="duration-300" to={"/"}>
        Home
      </NavLink>
      <NavLink
        activeclassname="active"
        className="duration-300 "
        to={"/listings"}
      >
        Place to stay?
      </NavLink>
      <NavLink
        activeclassname="active"
        className="duration-300"
        to={"dashboard/become-a-host"}
      >
        Become a host
      </NavLink>
      <NavLink
        end
        activeclassname="active"
        className="duration-300"
        to={"/dashboard"}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

import { useContext } from "react";
import { headerContext } from "../utils/mobileHeaderContext";
import { NavLink } from "react-router-dom";

export default function MobileDropdown() {
  const [activeHeader, setActiveHeader] = useContext(headerContext);
  console.log(activeHeader);
  const handleNavLinkClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
  };

  return (
    <div className="w-full p-5 flex flex-col gap-5 font-poppins">
      <p className=" font-poppins text-primaryDark opacity-50">Main menu</p>
      <div className="whitespace-nowrap flex flex-col gap-3">
        <NavLink
          activeclassname="active"
          className="text-[18px] w-full p-3 flex items-center gap-4 rounded-[10px]"
          to={"/"}
          onClick={handleNavLinkClick}
        >
          <img src="../home.svg" alt="" />
          Home
        </NavLink>
        <NavLink
          activeclassname="active"
          className="text-[18px] w-full p-3 flex items-center gap-4 rounded-[10px]"
          to={"/listings"}
          onClick={handleNavLinkClick}
        >
          <img src="../home.svg" alt="" />
          Place to stay?
        </NavLink>
        <NavLink
          activeclassname="active"
          className="text-[18px] w-full p-3 flex items-center gap-4 rounded-[10px]"
          to={"dashboard/become-a-host"}
          onClick={handleNavLinkClick}
        >
          <img src="../home.svg" alt="" />
          Become a host
        </NavLink>
        <NavLink
          end
          activeclassname="active"
          className="text-[18px] w-full p-3 flex items-center gap-4 rounded-[10px]"
          to={"/dashboard"}
          onClick={handleNavLinkClick}
        >
          <img src="../home.svg" alt="" />
          Dashboard
        </NavLink>
      </div>
    </div>
  );
}

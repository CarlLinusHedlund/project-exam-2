import { useContext } from "react";
import { headerContext } from "../utils/mobileHeaderContext";
import { NavLink } from "react-router-dom";
import ProfileContent from "./profileContent";
import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";

const staggerMenuItems = stagger(0.1, { startDelay: 0.05 });

function useMenuAnimation(activeHeader) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".li",
      activeHeader
        ? { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, x: 100, scale: 0.8, filter: "blur(2px)" },
      {
        duration: activeHeader ? 0.4 : 0.6,
        delay: activeHeader ? staggerMenuItems : 0,
      }
    );
  }, [activeHeader, animate]);

  return scope;
}

export default function MobileDropdown() {
  const [activeHeader, setActiveHeader] = useContext(headerContext);
  const scope = useMenuAnimation(activeHeader);

  const handleNavLinkClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
  };

  return (
    <div
      ref={scope}
      className="w-full h-full flex flex-col justify-between pb-[75px]"
    >
      <div className="w-full p-5 flex flex-col gap-2 font-poppins">
        <p className=" text-sm font-poppins text-primaryDark opacity-50">
          Main menu
        </p>
        <div className="whitespace-nowrap text-primaryDark flex flex-col gap-3">
          <NavLink
            activeclassname="active"
            className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
            to={"/"}
            onClick={handleNavLinkClick}
          >
            <img src="../home.svg" alt="" />
            Home
          </NavLink>
          <NavLink
            activeclassname="active"
            className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
            to={"/listings"}
            onClick={handleNavLinkClick}
          >
            <img src="../home.svg" alt="" />
            Place to stay?
          </NavLink>
          <NavLink
            activeclassname="active"
            className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
            to={"dashboard/become-a-host"}
            onClick={handleNavLinkClick}
          >
            <img src="../home.svg" alt="" />
            Become a host
          </NavLink>
          <NavLink
            end
            activeclassname="active"
            className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
            to={"/dashboard"}
            onClick={handleNavLinkClick}
          >
            <img src="../home.svg" alt="" />
            Dashboard
          </NavLink>
        </div>
      </div>
      <div className="">
        <ProfileContent />
      </div>
    </div>
  );
}

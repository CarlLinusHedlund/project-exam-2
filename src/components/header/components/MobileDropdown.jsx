import { useContext } from "react";
import { headerContext } from "../utils/MobileHeaderContext";
import { NavLink } from "react-router-dom";
import { ProfileContent, SingedInProfile } from "./ProfileContent";
import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import HomeSvg, { DashboardSvg, HostSvg, ListingsSvg } from "../../DynamicSvgs";

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
      className="w-full h-full flex flex-col justify-between pb-[75px] overflow-y-scroll"
    >
      <div className="w-full flex flex-col gap-2 font-poppins">
        <SingedInProfile />
        <div className="p-5">
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
              <HomeSvg
                color={window.location.pathname === "/" ? "#E0736D" : "#A7A7A7"}
              />
              Home
            </NavLink>
            <NavLink
              activeclassname="active"
              className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
              to={"/venues"}
              onClick={handleNavLinkClick}
            >
              <ListingsSvg
                color={
                  window.location.pathname === "/listings"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Place to stay?
            </NavLink>
            <NavLink
              activeclassname="active"
              className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
              to={"/dashboard/become-a-host"}
              onClick={handleNavLinkClick}
            >
              <HostSvg
                color={
                  window.location.pathname === "/dashboard/become-a-host"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Become a host
            </NavLink>
            <NavLink
              end
              activeclassname="active"
              className="li text-[16px] w-full p-2 flex items-center gap-4 rounded-[10px]"
              to={"/dashboard"}
              onClick={handleNavLinkClick}
            >
              <DashboardSvg
                color={
                  window.location.pathname === "/dashboard"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Dashboard
            </NavLink>
          </div>
        </div>
      </div>
      <div className="pb-[10px]">
        <ProfileContent />
      </div>
    </div>
  );
}

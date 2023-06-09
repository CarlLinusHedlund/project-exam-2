import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import HomeSvg, {
  DashboardSvg,
  ProfileSvg,
  PublishSvg,
  StatisticSvg,
} from "../../../components/DynamicSvgs";
import Logo from "../../../components/header/components/Logo";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  return (
    <>
      {isMobile && (
        <div className=" w-full z-10 fixed flex justify-between items-center bg-primaryWhite bottom-0 h-20 left-0 right-0 mx-auto px-3 sm:px-10">
          <div>
            <Link to="/">
              <HomeSvg height="20px" width="20px" color="#A7A7A7" />
            </Link>
          </div>
          <div
            className={`p-2 ${
              location.pathname === "/dashboard/publish"
                ? "bg-primaryDark"
                : "bg-none"
            } rounded-[10px] duration-500 `}
          >
            <Link to="/dashboard/publish">
              <PublishSvg
                color={
                  location.pathname === "/dashboard/publish"
                    ? "#FAFAFA"
                    : "#A7A7A7"
                }
                height="20px"
                width="20px"
              />
            </Link>
          </div>
          <Link to="/dashboard">
            <DashboardSvg
              color={location.pathname === "/dashboard" ? "#252525" : "#A7A7A7"}
              height="40px"
              width="40px"
            />
          </Link>
          <div
            className={`p-2 ${
              location.pathname === "/dashboard/statistics"
                ? "bg-primaryDark"
                : "bg-none"
            } rounded-[10px] duration-500 `}
          >
            <Link to="/dashboard/statistics">
              <StatisticSvg
                color={
                  location.pathname === "/dashboard/statistics"
                    ? "#FAFAFA"
                    : "#A7A7A7"
                }
                height="20px"
                width="20px"
              />
            </Link>
          </div>
          <div
            className={`p-2 ${
              location.pathname === "/dashboard/profile"
                ? "bg-primaryDark"
                : "bg-none"
            } rounded-[10px] duration-500 `}
          >
            <Link to="/dashboard/profile">
              <ProfileSvg
                color={
                  location.pathname === "/dashboard/profile"
                    ? "#FAFAFA"
                    : "#A7A7A7"
                }
                height="20px"
                width="20px"
              />
            </Link>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className=" border-r-2 border-[#e8e8e8] bg-primaryWhite font-poppins z-10 flex flex-col pr-5 pl-5 min-w-[250px] w-[250px] sticky left-0 top-0 bottom-0 min-h-screen pt-5 gap-10 ">
          <Logo />
          <div className="flex flex-col gap-4">
            <Link
              className={` ${
                location.pathname === "/dashboard"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center group hover:bg-[#F0F0F0] duration-500 w-full rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard"
            >
              <div className="duration-300 group-hover:rotate-6 group-hover:scale-105">
                <DashboardSvg
                  color={`${
                    location.pathname === "/dashboard" ? "#252525" : "#A7A7A7"
                  }`}
                  height="15px"
                  width="15px"
                />
              </div>
              Dashboard
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/profile"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center group hover:bg-[#F0F0F0] duration-500 w-full rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/profile"
            >
              <div className="duration-300 group-hover:rotate-6 group-hover:scale-105">
                <ProfileSvg
                  color={`${
                    location.pathname === "/dashboard/profile"
                      ? "#252525"
                      : "#A7A7A7"
                  }`}
                  height="15px"
                  width="15px"
                />
              </div>
              Account
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/statistics"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center group hover:bg-[#F0F0F0] duration-500 w-full rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/statistics"
            >
              <div className="duration-300 group-hover:rotate-6 group-hover:scale-105">
                <StatisticSvg
                  color={`${
                    location.pathname === "/dashboard/statistics"
                      ? "#252525"
                      : "#A7A7A7"
                  }`}
                  height="15px"
                  width="15px"
                />
              </div>
              Statstics
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/publish"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex group items-center hover:bg-[#F0F0F0] duration-500 w-full rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/publish"
            >
              <div className="duration-300 group-hover:rotate-6 group-hover:scale-105">
                <PublishSvg
                  color={`${
                    location.pathname === "/dashboard/publish"
                      ? "#252525"
                      : "#A7A7A7"
                  }`}
                  height="15px"
                  width="15px"
                />
              </div>
              Publish a venue
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import HomeSvg, {
  DashboardSvg,
  ProfileSvg,
  PublishSvg,
  StatisticSvg,
} from "../../../components/DynamicSvgs";

export default function Nav() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {isMobile && (
        <div className=" z-10 fixed flex justify-between items-center bg-primaryWhite bottom-0 h-20 left-0 right-0 max-w-xl mx-auto px-3 sm:px-10">
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
              location.pathname === "/dashboard/statstics"
                ? "bg-primaryDark"
                : "bg-none"
            } rounded-[10px] duration-500 `}
          >
            <Link to="/dashboard/statstics">
              <StatisticSvg
                color={
                  location.pathname === "/dashboard/statstics"
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
        <div className=" bg-primaryWhite font-poppins z-10 flex flex-col px-5 w-[250px] fixed left-0 top-0 bottom-0 min-h-screen pt-36 ">
          <div className="flex flex-col gap-4">
            <Link
              className={` ${
                location.pathname === "/dashboard"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center duration-500 rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard"
            >
              <DashboardSvg
                color={`${
                  location.pathname === "/dashboard" ? "#252525" : "#A7A7A7"
                }`}
                height="20px"
                width="20px"
              />
              Dashboard
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/profile"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center duration-500 rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/profile"
            >
              <ProfileSvg
                color={`${
                  location.pathname === "/dashboard/profile"
                    ? "#252525"
                    : "#A7A7A7"
                }`}
                height="20px"
                width="20px"
              />
              Account
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/statstics"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center duration-500 rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/statstics"
            >
              <StatisticSvg
                color={`${
                  location.pathname === "/dashboard/statstics"
                    ? "#252525"
                    : "#A7A7A7"
                }`}
                height="20px"
                width="20px"
              />
              Statstics
            </Link>
            <Link
              className={` ${
                location.pathname === "/dashboard/publish"
                  ? "bg-[#F0F0F0] text-primaryDark font-medium "
                  : "bg-none text-[#a7a7a7] "
              } flex items-center duration-500 rounded-[10px] gap-2 py-2 px-3 `}
              to="/dashboard/publish"
            >
              <PublishSvg
                color={`${
                  location.pathname === "/dashboard/publish"
                    ? "#252525"
                    : "#A7A7A7"
                }`}
                height="20px"
                width="20px"
              />
              Publish a venue
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

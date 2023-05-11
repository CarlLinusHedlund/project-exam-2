import { useEffect, useState } from "react";
import { useAnimate, stagger } from "framer-motion";
import { useContext } from "react";
import { headerContext } from "../utils/MobileHeaderContext";
import { SignInContext, SignUpContext } from "../../auth/utils/AuthContext";
import { UserContext } from "../../auth/utils/UserContext";
import SignOut from "../../auth/SignOut";
import { NavLink } from "react-router-dom";
import { AccountSettingsSvg, HelpSvg, MessagesSvg } from "../../DynamicSvgs";

const staggerButtons = stagger(0.1, { startDelay: 0.05 });

function useMenuAnimation(activeHeader) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".animate",
      activeHeader
        ? { opacity: 1, y: 0, filter: "blur(0px)" }
        : { opacity: 0, y: 50, filter: "blur(2px)" },
      {
        duration: activeHeader ? 0.6 : 0.1,
        delay: activeHeader ? staggerButtons : 0,
      }
    );
  }, [activeHeader, animate]);

  return scope;
}

export function ProfileContent() {
  const session = useContext(UserContext);
  const [activeHeader, setActiveHeader] = useContext(headerContext);
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);
  const scope = useMenuAnimation(activeHeader);

  const handleSignInClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
    setSignInModal(!signInModal);
  };

  const handleSignUpClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
    setSignUpModal(!signUpModal);
  };

  return (
    <div
      ref={scope}
      className={`w-full h-fit font-poppins p-5 text-primaryDark ${
        session.session ? " border-[#E3E3E3] border-t-[2px] " : ""
      }`}
    >
      {session.session ? (
        <SignOut />
      ) : (
        <div className="flex flex-col md:flex-row gap-5 whitespace-nowrap">
          <button
            onClick={handleSignInClick}
            className="animate w-full p-2 rounded-[10px] shadow-sm bg-[#F4F4F4]"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUpClick}
            className="button w-full p-2 rounded-[10px] bg-primaryCoral"
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
}

export function ProfileContentDesktop() {
  const session = useContext(UserContext);
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);
  const handleSignInClickDesktop = () => {
    setSignInModal(!signInModal);
  };
  const handleSignUpClickDesktop = () => {
    setSignUpModal(!signUpModal);
  };
  return (
    <>
      {session.session ? (
        <SingedInProfileDesktop />
      ) : (
        <div className="flex flex-row gap-4 whitespace-nowrap">
          <button
            onClick={handleSignInClickDesktop}
            className=" text-[14px] h-fit py-[6px] min-w-[90px] px-[25px] button w-full rounded-[10px] duration-200 hover:shadow-md bg-[#F4F4F4] hover:scale-105"
          >
            Sign In
          </button>
          <button
            onClick={handleSignUpClickDesktop}
            className="text-[14px] button w-full min-w-[90px] h-fit py-[6px] px-[25px] rounded-[10px] bg-primaryCoral duration-200 hover:shadow-md hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      )}
    </>
  );
}

export function SingedInProfile() {
  const [activeHeader, setActiveHeader] = useContext(headerContext);
  const session = useContext(UserContext);
  const [profileNav, setProfileNav] = useState(false);

  const profileNavHandler = () => {
    setProfileNav(!profileNav);
  };

  if (session.session) {
    const { user } = session.session;
    const firstLetter = user.user_metadata.full_name[0];

    const checkWindowSize = () => {
      setProfileNav(false);
      if (window.innerWidth < 768) {
        // run some code here
        setActiveHeader(!activeHeader);
      }
    };
    return (
      <div className="py-5 pr-5 pl-2 sm:pl-5 border-b-[1px] border-[#E3E3E3] md:border-none">
        <div className="relative ">
          <div
            onClick={profileNavHandler}
            className="flex justify-between gap-2 "
          >
            <div className="flex gap-2">
              {user.user_metadata.avatar_url ? (
                <img
                  className=" h-10 w-10 rounded-full "
                  src={user.user_metadata.avatar_url}
                  alt={`${user.user_metadata.full_name}`}
                />
              ) : (
                <div className=" text-[16px] bg-primaryCoral h-10 w-10 flex justify-center items-center rounded-full ">
                  {firstLetter}
                </div>
              )}
              <div className=" whitespace-nowrap text-ellipsis overflow-hidden ">
                <p className=" text-[14px] ">{user.user_metadata.full_name}</p>
                <p className="text-[#868686] text-[12px]">{user.email}</p>
              </div>
            </div>
            <img
              className={` duration-200 ${profileNav ? " rotate-180 " : ""}  `}
              src="../arrow.svg"
              alt="arrow"
            />
          </div>
          <div
            className={`overflow-hidden flex flex-col gap-2 duration-300 text-primaryDark font-poppins px-5 text-[14px] ${
              profileNav ? " pt-5 h-32 md:h-48 " : " py-0 h-0"
            }  bottom-0 left-0 `}
          >
            <NavLink
              onClick={checkWindowSize}
              className={`px-2 py-[5px] rounded-[10px] flex items-center gap-2 whitespace-nowrap delay-150 duration-500 ${
                profileNav
                  ? "opacity-100 translate-y-0 "
                  : " translate-y-3 opacity-0 "
              } `}
              to={"/dashboard/profile"}
            >
              <AccountSettingsSvg
                color={
                  window.location.pathname === "/dashboard/profile"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Account settings
            </NavLink>
            <NavLink
              onClick={checkWindowSize}
              className={`px-2 py-[5px] rounded-[10px] flex items-center gap-2 whitespace-nowrap delay-100 duration-500 ${
                profileNav
                  ? "opacity-100 translate-y-0 "
                  : " translate-y-3 opacity-0 "
              } `}
              to={"/dashboard/messages"}
            >
              <MessagesSvg
                color={
                  window.location.pathname === "/dashboard/messages"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Messages
            </NavLink>
            <NavLink
              onClick={checkWindowSize}
              className={`px-2 py-[5px] rounded-[10px] flex items-center gap-2 whitespace-nowrap delay-75 duration-500 ${
                profileNav
                  ? "opacity-100 translate-y-0 "
                  : " translate-y-3 opacity-0 "
              } `}
              to={"/help-center"}
            >
              <HelpSvg
                color={
                  window.location.pathname === "/help-center"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Help center
            </NavLink>
            <SignOut />
          </div>
        </div>
      </div>
    );
  }
}

const staggerLinks = stagger(0.1, { startDelay: 0.02 });

function useModalAnimation(profileNav) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(".modal", profileNav ? { opacity: 1 } : { opacity: 0 }, {
      duration: profileNav ? 0.6 : 0,
    }),
      animate(
        ".link",
        profileNav ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
        {
          duration: profileNav ? 0.1 : 0.3,
          delay: profileNav ? staggerLinks : 0,
        }
      );
  }, [profileNav, animate]);

  return scope;
}

export function SingedInProfileDesktop() {
  const session = useContext(UserContext);
  const [profileNav, setProfileNav] = useState(false);
  const scope = useModalAnimation(profileNav);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = scope.current;
      if (modal && !modal.contains(event.target) && profileNav) {
        setProfileNav(false);
      }
    };

    if (profileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileNav, scope]);

  const profileNavHandler = () => {
    setProfileNav(!profileNav);
  };

  if (session.session) {
    const { user } = session.session;
    const firstLetter = user.user_metadata.full_name[0];
    const checkWindowSize = () => {
      setProfileNav(false);
    };

    return (
      <div
        ref={scope}
        className="py-5 pr-2 pl-2 sm:pl-5 border-b-[1px] border-[#E3E3E3] md:border-none"
      >
        <div className="relative ">
          <div
            onClick={profileNavHandler}
            className="cursor-pointer flex justify-between gap-2 "
          >
            <div className="flex gap-2 items-center px-2">
              {user.user_metadata.avatar_url ? (
                <img
                  className=" h-6 w-6 rounded-full "
                  src={user.user_metadata.avatar_url}
                  alt={`${user.user_metadata.full_name}`}
                />
              ) : (
                <div className=" text-[14px] bg-primaryCoral h-8 w-8 flex justify-center items-center rounded-full ">
                  {firstLetter}
                </div>
              )}
              <div className=" whitespace-nowrap text-ellipsis overflow-hidden ">
                <p className=" text-[14px] ">{user.user_metadata.full_name}</p>
                <p className="text-[#868686] text-[12px]">{user.email}</p>
              </div>
            </div>
            <img
              className={` duration-200 ${profileNav ? " rotate-180 " : ""}  `}
              src="../arrow.svg"
              alt="arrow"
            />
          </div>
          <div
            className={` modal ${
              profileNav ? " shadow-lg h-fit" : "h-0 shadow-none "
            } overflow-hidden bg-primaryWhite rounded-md absolute top-[50px] flex-col gap-10 text-primaryDark bg-[primaryWhite] border-[1px] border-[#E3E3E3] font-poppins px-2 py-2 text-[14px] left-0 right-0`}
          >
            <NavLink
              onClick={checkWindowSize}
              className=" duration-300 hover:bg-gray-100 link px-2 py-[8px] rounded-[10px] flex items-center gap-2 whitespace-nowrap "
              to={"/dashboard/profile"}
            >
              <AccountSettingsSvg
                color={
                  window.location.pathname === "/dashboard/profile"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Account settings
            </NavLink>
            <NavLink
              onClick={checkWindowSize}
              className=" duration-300 hover:bg-gray-100 link px-2 py-[8px] rounded-[10px] flex items-center gap-2 whitespace-nowrap "
              to={"/dashboard/messages"}
            >
              <MessagesSvg
                color={
                  window.location.pathname === "/dashboard/messages"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Messages
            </NavLink>
            <NavLink
              onClick={checkWindowSize}
              className=" duration-300 hover:bg-gray-100 link px-2 py-[8px] rounded-[10px] flex items-center gap-2 whitespace-nowrap "
              to={"/help-center"}
            >
              <HelpSvg
                color={
                  window.location.pathname === "/help-center"
                    ? "#E0736D"
                    : "#A7A7A7"
                }
              />
              Help center
            </NavLink>
            <div className=" duration-300 hover:bg-gray-100 px-2 py-[8px] md:cursor-pointer md:rounded-[10px] link">
              <SignOut />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

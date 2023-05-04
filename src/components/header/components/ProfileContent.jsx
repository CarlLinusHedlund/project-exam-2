import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { useContext } from "react";
import { headerContext } from "../utils/MobileHeaderContext";
import { SignInContext, SignUpContext } from "../../auth/utils/AuthContext";

const staggerButtons = stagger(0.1, { startDelay: 0.05 });

function useMenuAnimation(activeHeader) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      ".button",
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
    <div ref={scope} className="w-full h-fit font-poppins p-5 text-primaryDark">
      <div className="flex flex-col md:flex-row gap-5 whitespace-nowrap">
        <button
          onClick={handleSignInClick}
          className="button w-full p-2 rounded-[10px] shadow-sm bg-[#F4F4F4]"
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
      <div className="hidden">Profile Signed in</div>
    </div>
  );
}

export function ProfileContentDesktop() {
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);
  const handleSignInClickDesktop = () => {
    setSignInModal(!signInModal);
  };
  const handleSignUpClickDesktop = () => {
    setSignUpModal(!signUpModal);
  };
  return (
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
  );
}

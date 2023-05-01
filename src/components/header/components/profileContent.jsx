import { useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import { useContext } from "react";
import { headerContext } from "../utils/mobileHeaderContext";
import { SignInContext, SignUpContext } from "../../auth/utils/authContext";

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

export default function ProfileContent() {
  const [activeHeader, setActiveHeader] = useContext(headerContext);
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);

  const scope = useMenuAnimation(activeHeader);

  const handleSignInClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
    setSignInModal(true);
    console.log("SignInModal", signInModal);
  };

  const handleSignUpClick = () => {
    setActiveHeader(false); // Close the menu by updating activeHeader to false
    setSignUpModal(true);
    console.log("SignUpModal", signUpModal);
  };

  return (
    <div ref={scope} className="w-full h-fit font-poppins p-5 text-primaryDark">
      <div className="flex flex-col md:flex-row gap-5 whitespace-nowrap">
        <button
          onClick={handleSignInClick}
          className="button w-full p-2 rounded-[10px] shadow-md bg-[#F4F4F4]"
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

import { useContext, useEffect, useRef } from "react";
import { SignInContext } from "./utils/AuthContext";
import { useAnimate } from "framer-motion";
import SignInForm from "./SignInForm";

function useSignInAnimation(activeSignInModal, modalRef) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (activeSignInModal) {
      modalRef.current.style.display = "flex"; // Show the modal by removing the hidden class

      setTimeout(() => {
        animate(
          modalRef.current,
          { opacity: 1 },
          {
            duration: 0.6,
          },
          { delay: 0.5 }
        );
      }, 500); // Delay the animation by 100 milliseconds (adjust as needed)
    } else {
      animate(
        modalRef.current,
        { opacity: 0 },
        {
          duration: 0.4,
          onComplete: () => {
            modalRef.current.style.display = "none"; // Hide the modal after the animation completes
          },
        }
      );
    }
  }, [activeSignInModal, animate, modalRef]);

  return scope;
}

export default function SignInModal() {
  const [activeSignInModal, setActiveSignInModal] = useContext(SignInContext);
  const modalRef = useRef(null);
  useSignInAnimation(activeSignInModal, modalRef);

  const handleSignInModalClick = () => {
    setActiveSignInModal(false);
  };

  return (
    <div
      ref={modalRef}
      className="signInModal justify-center items-center fixed w-screen h-screen top-0 left-0 right-0 z-30 backdrop-blur-[2px] bg-[#a9a9a91c] px-4 pt-[80px] pb-[20px]"
    >
      <div className="relative w-full h-full max-h-[520px] max-w-sm bg-primaryWhite rounded-[10px] shadow-lg overflow-y-scroll ">
        <img
          className="  cursor-pointer md:h-[15px] md:w-[15px] h-[20px] w-[20px] absolute top-3 right-3 hover:scale-110 duration-300 z-40 "
          onClick={handleSignInModalClick}
          src="../close.svg"
          alt="close"
        />
        <SignInForm />
      </div>
    </div>
  );
}

import { useContext, useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { SignUpContext } from "./utils/AuthContext";
import SignUpForm from "./SignUpForm";

function useSignUpAnimation(activeSignUpModal, modalRef) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (activeSignUpModal) {
      modalRef.current.style.display = "flex"; // Show the modal by removing the hidden class

      setTimeout(() => {
        animate(
          modalRef.current,
          { opacity: 1 },
          {
            duration: 0.4,
          }
        );
      }, 200); // Delay the animation by 100 milliseconds (adjust as needed)
    } else {
      animate(
        modalRef.current,
        { opacity: 0 },
        {
          duration: 0.6,
          onComplete: () => {
            modalRef.current.style.display = "none"; // Hide the modal after the animation completes
          },
        }
      );
    }
  }, [activeSignUpModal, animate, modalRef]);

  return scope;
}

export default function SignUpModal() {
  const [activeSignUpModal, setActiveSignUpMOdal] = useContext(SignUpContext);
  const modalRef = useRef(null);
  useSignUpAnimation(activeSignUpModal, modalRef);

  const handleSignUpModalClick = () => {
    setActiveSignUpMOdal(false);
    console.log("ActiveSignUpMOdal", activeSignUpModal);
  };

  return (
    <div
      ref={modalRef}
      className="signUpModal justify-center items-center absolute w-screen h-screen top-0 left-0 right-0 z-30 backdrop-blur-[2px] bg-[#a9a9a91c] px-4 pt-[80px] pb-[20px] "
    >
      <div className="relative w-full h-full max-h-[650px] max-w-sm bg-primaryWhite rounded-[10px] shadow-lg overflow-y-scroll ">
        <img
          className=" cursor-pointer md:h-[15px] md:w-[15px] h-[20px] w-[20px] absolute top-3 right-3 hover:scale-110 duration-300 "
          onClick={handleSignUpModalClick}
          src="../close.svg"
          alt="close"
        />
        <SignUpForm />
      </div>
    </div>
  );
}

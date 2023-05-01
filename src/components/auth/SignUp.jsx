import { useContext, useEffect, useRef } from "react";
import { useAnimate } from "framer-motion";
import { SignUpContext } from "./utils/authContext";

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
      }, 100); // Delay the animation by 100 milliseconds (adjust as needed)
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
      onClick={handleSignUpModalClick}
      ref={modalRef}
      className="signInModal justify-center items-center absolute w-screen h-screen top-0 left-0 right-0 z-30 backdrop-blur-[2px] bg-[#a9a9a91c]"
    >
      <div className="relative w-full h-full max-h-[500px] max-w-sm bg-primaryWhite rounded-[10px] shadow-lg">
        <p onClick={handleSignUpModalClick}>Close</p>
      </div>
    </div>
  );
}

import { useContext, useEffect, useRef } from "react";
import { SignInContext } from "./utils/authContext";
import { useAnimate } from "framer-motion";

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
  }, [activeSignInModal, animate, modalRef]);

  return scope;
}

export default function SignInModal() {
  const [activeSignInModal, setActiveSignInModal] = useContext(SignInContext);
  const modalRef = useRef(null);
  useSignInAnimation(activeSignInModal, modalRef);

  const handleSignInModalClick = () => {
    setActiveSignInModal(false);
    console.log("activeSignInModal", activeSignInModal);
  };

  return (
    <div
      onClick={handleSignInModalClick}
      ref={modalRef}
      className="signInModal justify-center items-center absolute w-screen h-screen top-0 left-0 right-0 z-30 backdrop-blur-[2px] bg-[#a9a9a91c]"
    >
      <div className="relative w-full h-full max-h-[500px] max-w-sm bg-primaryWhite rounded-[10px] shadow-lg">
        <p onClick={handleSignInModalClick}>Close</p>
      </div>
    </div>
  );
}

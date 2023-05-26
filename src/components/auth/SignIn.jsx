import { useContext } from "react";
import { SignInContext } from "./utils/AuthContext";
import SignInForm from "./SignInForm";
import { useNavigate } from "react-router-dom";

export default function SignInModal() {
  const navigate = useNavigate();
  const [activeSignInModal, setActiveSignInModal] = useContext(SignInContext);

  const handleSignInModalClick = () => {
    if (window.location.pathname === "/signIn") {
      navigate("/");
      setActiveSignInModal(!activeSignInModal);
    } else {
      setActiveSignInModal(!activeSignInModal);
    }
  };

  return (
    <div
      // ref={modalRef}
      className="signInModal justify-center items-center flex fixed w-screen h-screen top-0 left-0 right-0 z-30 backdrop-blur-[2px] bg-[#a9a9a91c] px-4 pt-[80px] pb-[20px]"
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

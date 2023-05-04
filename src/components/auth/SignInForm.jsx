import { useContext } from "react";
import { SignInContext, SignUpContext } from "./utils/AuthContext";

export default function SignInForm() {
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);

  const handleSignUpClick = () => {
    setSignInModal(!signInModal);
    setSignUpModal(!signUpModal);
  };

  return (
    <div className="font-poppins px-5 pt-12 pb-5">
      <div className="flex flex-col gap-2">
        <h2 className="text-[25px] font-medium leading-8 ">
          Welcome to Holidaze, <br /> sign in to continue.
        </h2>
        <p className="text-[12px]">
          Don’t have an account? <br />{" "}
          <span
            onClick={handleSignUpClick}
            className=" whitespace-nowrap font-semibold underline cursor-pointer "
          >
            Create a account
          </span>{" "}
          It take less then a minute.
        </p>
      </div>
      <form className="w-full h-fit pt-10">
        <label htmlFor="googleAuth">
          <button className="w-full p-2 rounded-xl border border-[#B4B4B4] flex items-center justify-center gap-3 md:hover:scale-105 duration-300">
            <img src="../google.svg" alt="google icon" /> Sign in with Google
          </button>
        </label>
        <div className="flex justify-betwee items-center py-6">
          <div className="w-full rounded-full h-[1px] border-[1px] border-[#B4B4B4] "></div>
          <p className="px-4">or</p>
          <div className="w-full rounded-full h-[1px] border-[1px] border-[#B4B4B4] "></div>
        </div>
        <div className="flex flex-col gap-4 items-center">
          <label className="w-full" htmlFor="email">
            <label htmlFor="email">Email</label>
            <input
              className="duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
              id="email"
              name="email"
              type="email"
            />
          </label>
          <label className="w-full" htmlFor="current-password">
            <label htmlFor="current-password">Password</label>
            <input
              className=" duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
              id="current-password"
              name="current-password"
              type="current-password"
            />
          </label>
          <button
            className=" duration-300 md:hover:scale-105 mt-10 max-w-[300px] p-2 w-full bg-primaryCoral rounded-xl"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

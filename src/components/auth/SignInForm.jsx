import { useContext, useState } from "react";
import { SignInContext, SignUpContext } from "./utils/AuthContext";
import { supabase } from "../../supabase";
import { useFormik } from "formik";
import { signInSchema } from "./utils/ValidateSchema";

export default function SignInForm() {
  const [signInResponse, setSignInResponse] = useState(null);
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);
  const [errorMessage, setErrorMessage] = useState("");

  // const [session, setSession] = useContext(useContext);

  const handleSignUpClick = () => {
    setSignInModal(!signInModal);
    setSignUpModal(!signUpModal);
  };

  const closeError = () => {
    setSignInResponse(false);
    setErrorMessage(null);
  };

  if (signInModal === false) {
    setSignInResponse(false);
    setErrorMessage(null);
  }

  const onSubmit = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${values.email}`,
      password: `${values.password}`,
    });
    if (data) {
      console.log(data);
    }
    if (error) {
      setSignInResponse(true);
      setErrorMessage([error.message]);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: signInSchema,
      onSubmit,
    });

  return (
    <>
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
        <form onSubmit={handleSubmit} className="w-full h-fit pt-10">
          <div className="flex flex-col gap-5 items-center">
            <label className="w-full relative" htmlFor="email">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="username"
                className="duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                id="email"
                name="email"
                type="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
              />
              {touched.email && errors.email && (
                <p className=" absolute -bottom-[18px] text-[12px] text-red-400 ">
                  {errors.email}
                </p>
              )}
            </label>
            <label className="w-full relative" htmlFor="password">
              <label htmlFor="password">Password</label>
              <input
                className=" duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                id="password"
                name="password"
                autoComplete="current-password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
              />
              {errors.password && touched.password && (
                <p className=" absolute -bottom-[18px] text-[12px] text-red-400 ">
                  {errors.password}
                </p>
              )}
            </label>
            <button
              className=" duration-300 md:hover:scale-105 mt-5 max-w-[300px] p-2 w-full bg-primaryCoral rounded-xl"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
      {signInResponse && (
        <div className="absolute left-0 top-0 right-0 bottom-0 w-full h-full backdrop-blur-[2px] flex justify-center items-center bg-[#0000000f]">
          <div className="w-[90%] h-fit bg-primaryWhite mx-auto my-auto rounded-[10px] shadow-lg px-4 pb-6 flex flex-col gap-2 items-center overflow-y-scroll ">
            <img className="w-fit h-3/5 " src="failed.gif" alt="success" />
            <div>
              <h2 className="text-center font-medium font-poppins text-[20px] ">
                An error occured!
              </h2>
              <p>Message: {errorMessage}</p>
            </div>

            <div
              onClick={closeError}
              className=" font-medium font-poppins w-full py-2 bg-primaryCoral flex justify-center items-center rounded-[10px] md:hover:scale-105 duration-300 cursor-pointer mt-10"
            >
              Please try again!
            </div>
          </div>
        </div>
      )}
    </>
  );
}

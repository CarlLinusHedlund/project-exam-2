import { createContext, useContext, useState } from "react";
import { SignInContext, SignUpContext } from "./utils/AuthContext";
import { useFormik } from "formik";
import { validationSchema } from "./utils/ValidateSchema";
import "./index.css";
import { supabase } from "../../utils/Supabase";

export default function SignUpForm() {
  const [signInModal, setSignInModal] = useContext(SignInContext);
  const [signUpModal, setSignUpModal] = useContext(SignUpContext);
  const [emailInUse, setEmailInUse] = useState(null);
  const [signedUp, setSignedUp] = useState(false);

  if (signUpModal == false) {
    setSignedUp(false);
  }

  const handleSignInClick = () => {
    setSignInModal(!signInModal);
    setSignUpModal(!signUpModal);
    setSignedUp(false);
  };

  const onSubmit = async (values, actions) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", `${values.userEmail}`);
    if (error) {
      console.log(error);
      return error;
    }
    if (data.length < 1) {
      setEmailInUse(null);
      signUp();
    } else {
      setEmailInUse("email already in use");
    }

    async function signUp() {
      const { data, error } = await supabase.auth.signUp({
        email: values.userEmail,
        password: values.userPassword,
        options: {
          data: {
            name: values.userName,
            is_host: values.is_host,
          },
        },
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        setSignUpModal(false);
        actions.resetForm();
      }
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        userEmail: "",
        userName: "",
        userPassword: "",
        userConfirmPassword: "",
        is_host: false,
      },
      validationSchema: validationSchema,
      onSubmit,
    });

  return (
    <>
      <SignedUpContext.Provider value={[signedUp, setSignedUp]}>
        <div className=" relative font-poppins px-5 pt-12 pb-5">
          <div className="flex flex-col gap-2">
            <h2 className="text-[25px] font-medium leading-8 ">
              Welcome to Holidaze, <br /> sign up to continue.
            </h2>
            <p className="text-[12px]">
              Already have an account?{" "}
              <span
                onClick={handleSignInClick}
                className=" whitespace-nowrap font-semibold underline cursor-pointer "
              >
                Sign in here
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full h-fit pt-10">
            <div className=" relative flex flex-col gap-5 items-center">
              <label className="w-full relative" htmlFor="userEmail">
                <p>Email</p>
                <input
                  autoComplete="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userEmail}
                  className="duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                  id="email"
                  name="userEmail"
                  type="email"
                />
                {errors.userEmail && touched.userEmail && (
                  <p className=" absolute -bottom-4 text-[12px] text-red-400 ">
                    {errors.userEmail}
                  </p>
                )}
                {emailInUse && (
                  <p className=" absolute -bottom-4 text-[12px] text-red-400 ">
                    {emailInUse}
                  </p>
                )}
              </label>
              <label className="w-full relative " htmlFor="userName">
                <p htmlFor="userName">Full name</p>
                <input
                  autoComplete="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userName}
                  className="duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                  id="name"
                  name="userName"
                  type="text"
                />
                {errors.userName && touched.userName && (
                  <p className=" absolute -bottom-4 text-[12px] text-red-400 ">
                    {errors.userName}
                  </p>
                )}
              </label>
              <label className="relative w-full" htmlFor="userPassword">
                <label htmlFor="userPassword">Password</label>
                <input
                  autoComplete="new-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userPassword}
                  className=" duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                  id="userPassword"
                  name="userPassword"
                  type="password"
                />
                {errors.userPassword && touched.userPassword && (
                  <p className=" absolute -bottom-4 text-[12px] text-red-400 ">
                    {errors.userPassword}
                  </p>
                )}
              </label>
              <label className=" relative w-full" htmlFor="userConfirmPassword">
                <label htmlFor="userConfirmPassword">Confirm Password</label>
                <input
                  autoComplete="new-password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.userConfirmPassword}
                  className=" duration-500 focus:scale-105 outline-none bg-primaryWhite w-full p-2 rounded-xl border border-[#B4B4B4]"
                  id="userConfirmPassword"
                  name="userConfirmPassword"
                  type="password"
                />
                {errors.userConfirmPassword && touched.userConfirmPassword && (
                  <p className=" absolute -bottom-4 text-[12px] text-red-400 ">
                    {errors.userConfirmPassword}
                  </p>
                )}
              </label>
              <label className="flex w-fit gap-1">
                <span className="text-lg">Is Host?</span>
                <input
                  className={`h-5 w-5 checked:bg-red-100 `}
                  type="checkbox"
                  name="is_host"
                  placeholder="Is Host?"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.is_host}
                  id="is_host"
                />
              </label>
              <button
                className=" duration-300 md:hover:scale-105 mt-5 max-w-[300px] p-2 w-full bg-primaryCoral rounded-xl"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </SignedUpContext.Provider>
    </>
  );
}

export const SignedUpContext = createContext(false);

import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  userEmail: Yup.string().email("Invalid email").required("Email is required"),
  userName: Yup.string()
    .min(2, "At least 2 characters")
    .required("Required. Please enter your name"),
  userPassword: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
  userConfirmPassword: Yup.string()
    .oneOf([Yup.ref("userPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
});

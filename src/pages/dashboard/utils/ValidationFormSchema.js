import * as Yup from "yup";

export const ValidationFormSchema = (step) => {
  let schema;

  if (step === 1) {
    schema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      location: Yup.string().required("Location is required"),
      description: Yup.string().required("Description is required"),
      guest: Yup.number()
        .min(1, "Invalid number of guests")
        .required("Number of guests is required"),
    });
  } else if (step === 2) {
    schema = Yup.object().shape({
      lastName: Yup.string().required("Last name is required"),
      // Add validation for other fields in step 2
    });
  } else {
    // Add validation for other steps
  }

  return schema;
};

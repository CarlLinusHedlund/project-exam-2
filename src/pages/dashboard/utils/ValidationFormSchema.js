import * as Yup from "yup";

export const ValidationFormSchema = (step) => {
  let schema;

  if (step === 1) {
    schema = Yup.object().shape({
      title: Yup.string().required("Title is required"),
      pricePerNight: Yup.number().required("Select a price (Price per night)"),
      description: Yup.string().required("Description is required"),
      guest: Yup.number()
        .min(1, "Invalid number of guests")
        .required("Number of guests is required"),
      type: Yup.string("Type is required").required("Type is required"),
      meta: Yup.object(""),
    });
  } else if (step === 2) {
    schema = Yup.object().shape({
      files: Yup.array()
        .min(1, "Please select at least one file")
        .test("fileType", "Only JPG and PNG files are allowed", (files) => {
          if (!files) return true; // Skip validation if no files are selected
          return files.every(
            (file) => file.type === "image/jpeg" || file.type === "image/png"
          );
        })
        .test("fileSize", "File size should be less than 3MB", (files) => {
          if (!files) return true; // Skip validation if no files are selected
          return files.every((file) => file.size <= 3 * 1024 * 1024);
        })
        .test(
          "totalSize",
          "Total file size should be less than 50MB",
          (files) => {
            if (!files) return true; // Skip validation if no files are selected
            const totalSize = files.reduce((acc, file) => acc + file.size, 0);
            return totalSize <= 50 * 1024 * 1024;
          }
        ),
    });
  } else {
    // Add validation for other steps
    schema = Yup.object().shape({
      location: Yup.object().required("Location is required"),
    });
  }

  return schema;
};

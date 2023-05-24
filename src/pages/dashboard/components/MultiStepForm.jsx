import { Formik, Form } from "formik";
import { ValidationFormSchema } from "../utils/ValidationFormSchema";
import { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./StepTwo";

export default function MultiStepForm() {
  const [step, setStep] = useState(1);

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values, actions) => {
    console.log(values);
    if (step === 3) {
      // Handle final form submission
      console.log("Handle request: ", values);
    } else {
      // Move to the next step
      setStep(step + 1);
    }
  };

  return (
    <Formik
      initialValues={{
        title: "",
        location: "",
        description: "",
        files: [],
        guest: 1,
        // Add initial values for each step
      }}
      validationSchema={ValidationFormSchema(step)}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="flex flex-col justify-between duration-300 w-full rounded-[10px] border-[1px] border-[#e3e3e3] p-5 md:p-10 min-h-[500px] ">
          {/* Render form fields for each step */}
          {step === 1 && (
            <StepOne
              step={step}
              errors={errors}
              touched={touched}
              values={values}
              setFieldValue={setFieldValue}
            />
          )}
          {step === 2 && (
            <StepTwo
              files={values.files}
              setFiles={(newFiles) => setFieldValue("files", newFiles)}
              setFieldValue={setFieldValue}
              touched={touched}
              errors={errors}
            />
          )}
          {/* Add more steps */}
          <div className="flex mt-10 w-full gap-2 xxs:gap-10 items-center justify-between xxs:justify-end">
            {step === 2 && (
              <button
                className="px-3 xxs:px-5 rounded-[10px] text-[14px] duration-300 py-2 hover:bg-gray-100 text-gray-400"
                onClick={handlePrev}
                type="button"
              >
                Go back
              </button>
            )}
            <button
              className={` ${
                step === 1 ? "w-full sm:w-fit" : ""
              } rounded-[10px] text-[14px] text-primaryDark lg:hover:-translate-y-1 duration-300 px-12 xxs:px-16 py-2 bg-primaryCoral `}
              type="submit"
            >
              Next
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

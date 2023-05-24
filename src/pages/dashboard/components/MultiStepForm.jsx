import { Formik, Form } from "formik";
import { ValidationFormSchema } from "../utils/ValidationFormSchema";
import { useState } from "react";
import StepOne from "./stepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

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
    <>
      <div className="flex justify-between gap-10">
        <div className="flex flex-col w-[33%]">
          <p className="text-primaryCoral">Information</p>
          <div className="w-full h-[3px] bg-primaryCoral"></div>
        </div>
        <div className="flex flex-col w-[33%]">
          <p
            className={`${
              step === 2 || step === 3
                ? "text-primaryCoral"
                : "text-gray-300 blur-[2px]"
            }`}
          >
            Add images
          </p>
          <div
            className={`w-full h-[3px] ${
              step === 2 || step === 3
                ? "bg-primaryCoral"
                : "bg-gray-300 blur-[2px]"
            }`}
          ></div>
        </div>
        <div className="flex flex-col w-[33%]">
          <p
            className={`${
              step === 3 ? "text-primaryCoral" : "text-gray-300 blur-[2px]"
            }`}
          >
            Location
          </p>
          <div
            className={`w-full h-[3px] ${
              step === 3 ? "bg-primaryCoral" : "bg-gray-300 blur-[2px]"
            }`}
          ></div>
        </div>
      </div>
      <Formik
        initialValues={{
          title: "",
          location: "",
          description: "",
          files: [],
          guest: 1,
          type: {},
          // Add initial values for each step
        }}
        validationSchema={ValidationFormSchema(step)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => (
          <Form className="flex flex-col justify-between duration-300 w-full rounded-[10px] p-3 md:p-5 min-h-[500px] ">
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
            {step === 3 && (
              <StepThree
                values={values}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
              />
            )}
            {/* Add more steps */}
            <div className="flex mt-10 w-full gap-2 xxs:gap-10 items-center justify-between xxs:justify-end">
              {step > 1 && (
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
                {step === 3 ? "Publish" : "Next"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

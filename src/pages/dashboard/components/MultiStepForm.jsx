import { Formik, Form, Field } from "formik";
import { ValidationFormSchema } from "../utils/ValidationFormSchema";
import { useState } from "react";
import StepOne from "./stepOne";

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
        email: "",
        guest: 1,
        // Add initial values for each step
      }}
      validationSchema={ValidationFormSchema(step)}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, setFieldValue }) => (
        <Form className="flex flex-col justify-between duration-300 w-full rounded-[10px] border-[1px] border-[#e3e3e3] p-10 min-h-[500px] ">
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
            <div>
              <label htmlFor="lastName">Last Name</label>
              <Field as="textarea" id="lastName" name="lastName" />
              {errors.lastName && touched.lastName && (
                <div>{errors.lastName}</div>
              )}
              {/* Add more fields for step 2 */}
            </div>
          )}
          {/* Add more steps */}
          <div className="flex mt-10 w-full gap-10 items-center justify-end">
            {step === 2 && (
              <button
                className="px-16 rounded-[10px] text-[14px] hover:-translate-y-1 duration-300 py-2 border-[1px] text-gray-400 border-gray-400"
                onClick={handlePrev}
                type="button"
              >
                Prev
              </button>
            )}
            <button
              className=" rounded-[10px] text-[14px] text-primaryCoral hover:-translate-y-1 duration-300 px-16 py-2 border-[1px] border-red-400 "
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

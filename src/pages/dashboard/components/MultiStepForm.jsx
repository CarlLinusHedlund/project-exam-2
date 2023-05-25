import { Formik, Form } from "formik";
import { ValidationFormSchema } from "../utils/ValidationFormSchema";
import { useState } from "react";
import AddDetails from "./AddDetails";
import AddImages from "./AddImages";
import AddLocation from "./AddLocation";
import { usePublishVenueMutation } from "../../../store/modules/ApiSlice";
import { UserContext } from "../../../components/auth/utils/UserContext";
import { useContext } from "react";

export default function MultiStepForm() {
  const { session } = useContext(UserContext);
  const [step, setStep] = useState(1);

  const [publishVenue, { data: venueData, isLoading, error: venueError }] =
    usePublishVenueMutation();

  function geolocationSupported(setFieldValue) {
    if (navigator.geolocation) {
      getCurrentLocation(setFieldValue);
    } else {
      fetch("https://ipapi.co/json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setFieldValue("location.coordinates", {
            lng: data.longitude,
            lat: data.latitude,
          });
        });
    }
  }

  function getCurrentLocation(setFieldValue) {
    navigator.geolocation.getCurrentPosition(function (result) {
      result.coords.latitude; // latitude value
      result.coords.longitude; // longitude value
      setFieldValue("location.coordinates", {
        lng: result.coords.longitude,
        lat: result.coords.latitude,
      });
    });
  }

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values) => {
    console.log(step);
    if (step === 3) {
      console.log("Session publish", session.user.id);
      publishVenue({
        owner_id: session.user.id,
        location: values.location,
        title: values.title,
        description: values.description,
        price_per_night: values.pricePerNight,
        max_guest: values.guest,
        type: values.type,
      });
      console.log("Handle submit called");
      // Handle final form submission
      console.log("venueData", venueData);
      console.log("venueError", venueError);
      console.log("Handle request: ", values);
      // Use the values object to make a POST request to your database
    } else {
      // Move to the next step
      setStep(step + 1);
    }
  };

  return (
    <>
      <div className="flex justify-between gap-10 px-3">
        <div className="flex flex-col w-[33%]">
          <p className="text-primaryCoral text-[12px] sm:text-[16px]">
            Information
          </p>
          <div className="w-full h-[3px] bg-primaryCoral"></div>
        </div>
        <div className="flex flex-col w-[33%]">
          <p
            className={`text-[12px] sm:text-[16px] ${
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
            className={`text-[12px] sm:text-[16px] ${
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
          location: {
            coordinates: { lat: "", lng: "" },
            address: { city: "", country: "", street: "", zip: "" },
          },
          description: "",
          files: [],
          guest: 1,
          type: {},
          pricePerNight: 1,
        }}
        validationSchema={ValidationFormSchema(step)}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, values, setFieldValue }) => {
          // console.log("values", values);
          // console.log("error", errors);
          if (
            values.location.coordinates.lat === "" &&
            values.location.coordinates.lng === ""
          ) {
            geolocationSupported(setFieldValue);
          }

          return (
            <Form className="flex flex-col justify-between duration-300 w-full rounded-[10px] md:p-5 min-h-[500px] ">
              {/* Render form fields for each step */}
              {step === 1 && (
                <AddDetails
                  step={step}
                  errors={errors}
                  touched={touched}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {step === 2 && (
                <AddImages
                  files={values.files}
                  setFiles={(newFiles) => setFieldValue("files", newFiles)}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              )}

              {step === 3 && (
                <AddLocation
                  // location={location}
                  // setLocation={setLocation}
                  values={values}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                />
              )}
              <div className="flex mt-10 w-full gap-2 xxs:gap-10 items-center justify-between xxs:justify-end px-3">
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
                  type="submit"
                  className={` ${
                    step === 1 ? "w-full sm:w-fit" : ""
                  } rounded-[10px] text-[14px] text-primaryDark lg:hover:-translate-y-1 duration-300 px-12 xxs:px-16 py-2 bg-primaryCoral `}
                >
                  {step === 3 ? (isLoading ? "loading" : "Publish") : "Next"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

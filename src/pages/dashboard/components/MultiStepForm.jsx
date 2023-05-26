import { Formik, Form } from "formik";
import { ValidationFormSchema } from "../utils/ValidationFormSchema";
import { useState } from "react";
import AddDetails from "./AddDetails";
import AddImages from "./AddImages";
import AddLocation from "./AddLocation";
import {
  usePublishVenueMutation,
  useUpdateVenueMutation,
  useUploadFilesMutation,
} from "../../../store/modules/ApiSlice";
import { UserContext } from "../../../components/auth/utils/UserContext";
import { useContext } from "react";

export default function MultiStepForm() {
  const { session } = useContext(UserContext);
  const [step, setStep] = useState(1);
  // const [uploads, setUploads] = useState([]);

  //Publish venue mutation
  const [publishVenue, { isLoading, error }] = usePublishVenueMutation();
  const [uploadFiles, { isLoading: uploadLoading, error: uploadError }] =
    useUploadFilesMutation();
  const [updateVenue, { isLoading: updateLoading, error: updateError }] =
    useUpdateVenueMutation();

  //Gets user lat and lng if navigator.geolocation not suppoerted, fetch location with ipapi
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
            lon: data.longitude,
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
        lon: result.coords.longitude,
        lat: result.coords.latitude,
      });
    });
  }

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleSubmit = (values, user) => {
    const files = values.files;
    console.log(files);
    if (step === 3) {
      publishVenue({
        user_id: user.id,
        location: values.location,
        title: values.title,
        description: values.description,
        price_per_night: values.pricePerNight,
        max_guests: values.guest,
        type: values.type,
        meta: values.meta,
      }).then((response) => {
        console.log("publishVenue response:", response.data);
        if (!isLoading && !error) {
          // let uploads = [];
          response.data && console.log("homo: ", response.data);
          const venue_id = response.data.id;
          const uploadPromises = [];
          for (let file of files) {
            const uploadPromise = uploadFiles({
              venue_id: venue_id,
              file: file,
              user_id: user.id,
            }).then((uploadResponse) => {
              console.log(uploadResponse.data);
              const response = uploadResponse.data;
              const fileUrl = `${
                import.meta.env.VITE_PUBLIC_SUPABASE_URL
              }/storage/v1/object/public/venue_media/${response.path}`;
              // setUploads((prevUploads) => [...prevUploads, fileUrl]);
              return fileUrl;
            });
            uploadPromises.push(uploadPromise);
            // console.log("uploads outside", uploads);
            // console.log("files length", files);
          }

          Promise.all(uploadPromises).then((uploads) => {
            updateVenue({
              type: "addMedia",
              media: uploads,
              venue_id: venue_id,
            }).then((updateResponse) => {
              console.log(updateResponse);
              if (updateResponse) {
                const pathname = window.location.pathname;
                const host = window.location.host;
                console.log("host", host);
                console.log("pathname", pathname);
                window.location.pathname = `/venue/${venue_id}`;
              }
              console.log("Update success! Get In!!!!!!!!!");
              // uploads = [];
            });
            console.log("fireeeeeee");
            console.log(uploads.length);
          });
        }
      });
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
            coordinates: { lat: "", lon: "" },
            address: { city: "", country: "", street: "", zip: "" },
          },
          description: "",
          files: [],
          guest: 1,
          type: "",
          pricePerNight: 1,
          meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
            pool: false,
            gym: false,
            air_conditioning: false,
            heating: false,
            kitchen: false,
            tv: false,
            washing_machine: false,
          },
        }}
        validationSchema={ValidationFormSchema(step)}
        onSubmit={(values) => handleSubmit(values, session.user)}
      >
        {({ errors, touched, values, setFieldValue }) => {
          // console.log("values", values);
          // console.log("error", errors);
          if (
            values.location.coordinates.lat === "" &&
            values.location.coordinates.lon === ""
          ) {
            geolocationSupported(setFieldValue);
          }
          console.log(values);
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
                  {step === 3
                    ? isLoading || uploadLoading || updateLoading
                      ? "loading"
                      : "Publish"
                    : "Next"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

// Build the complete URL using the Supabase storage URL and file path
// const fileUrl = `${
//   import.meta.env.VITE_PUBLIC_SUPABASE_URL
// }/storage/v1/object/public/venue_media/${}`;
// // Add the file URL to the uploads array
// setUploads((prevUploads) => [...prevUploads, fileUrl]);
// console.log("uploadData", data);
//Finn ut hvordan jeg kan få uploadsafs fasefsd f
// if (uploads.length === files.length) {
//   console.log("update request is fired");
//   const { data: updateData, error } = await supabase
//     .from("venues")
//     .update({ media: uploads })
//     .eq("id", venue_id)
//     .select();
//   if (updateData) {
//     setUploads([]);
//     console.log("updated completed");
//     console.log("updateData: ", updateData);
//     console.log(
//       "Click this link",
//       window.location.hostname + `venue/id=${venue_id}`
//     );
//   }
//   if (error) {
//     console.log("updateError: ", error);
//   }
// }

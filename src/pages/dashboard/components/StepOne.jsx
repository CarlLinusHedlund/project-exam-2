import { Field } from "formik";
import PropTypes from "prop-types";

const StepOne = ({ errors, touched, values, setFieldValue }) => {
  const handleAddGuest = (values, setFieldValue) => {
    const currentGuests = values || 0;
    const newGuests = currentGuests + 1;
    setFieldValue("guest", newGuests);
  };

  const handleRemoveGuest = (values, setFieldValue) => {
    const currentGuests = values || 0;
    const newGuests = Math.max(currentGuests - 1, 1); // Minimum value is 1
    setFieldValue("guest", newGuests);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:justify-between">
        <label
          htmlFor="title"
          className="text-primaryDark relative flex flex-col text-[14px] w-full lg:w-[40%] "
        >
          Title*
          <Field
            className={` p-2 bg-primaryWhite duration-500 border-[1px] ${
              errors.title && touched.title
                ? "border-red-400"
                : "border-gray-300"
            }  rounded-[10px] outline-none `}
            type="text"
            id="title"
            name="title"
          />
          {/* <ErrorMessage name="title" component="div" className="error" /> */}
          {errors.title && touched.title && (
            <div className=" text-red-400 absolute -bottom-5 text-[14px] ">
              {errors.title}
            </div>
          )}
        </label>
        <label
          htmlFor="location"
          className="text-primaryDark relative flex flex-col text-[14px] w-full lg:w-[60%] "
        >
          Location*
          <Field
            className={` p-2 bg-primaryWhite duration-500 border-[1px] ${
              errors.location && touched.location
                ? "border-red-400"
                : "border-gray-300"
            }  rounded-[10px] outline-none `}
            type="text"
            id="location"
            name="location"
          />
          {errors.location && touched.location && (
            <div className=" text-red-400 text-[14px] absolute -bottom-5 ">
              {errors.location}
            </div>
          )}
        </label>
        {/* Add more fields for Step 1 */}
      </div>
      <div className="flex w-full flex-col gap-10 lg:flex-row lg:justify-between">
        <label
          htmlFor="description"
          className="text-primaryDark relative flex flex-col text-[14px] w-full lg:w-[60%] "
        >
          Description*
          <Field
            className={`p-2  min-h-[150px] text-[14px] duration-500 font-light bg-primaryWhite border-[1px] ${
              errors.description && touched.description
                ? "border-red-400"
                : "border-gray-300"
            } rounded-[10px] outline-none `}
            as="textarea"
            id="description"
            name="description"
          />
          {errors.description && touched.description && (
            <div className=" text-red-400 text-[14px] absolute -bottom-5 ">
              {errors.description}
            </div>
          )}
        </label>
        <div className="w-full flex lg:w-[40%] flex-col gap-3">
          <label
            htmlFor="guest"
            className="text-primaryDark flex flex-col w-full text-[14px] "
          >
            Max guests*
            <div className="flex items-center gap-2 px-5 py-1 justify-between bg-primaryWhite border-[1px] border-gray-300 rounded-[10px] ">
              <button
                onClick={() => handleRemoveGuest(values.guest, setFieldValue)}
                type="button"
                className={`text-[25px] ${
                  values.guest === 1 ? "text-gray-300" : "text-primaryDark"
                } `}
              >
                -
              </button>
              <Field
                className="p-2 w-10 flex justify-center bg-primaryWhite text-center items-center"
                type="number"
                id="guest"
                min={1}
                name="guest"
                disabled={values.guest}
              />
              <button
                onClick={() => handleAddGuest(values.guest, setFieldValue)}
                type="button"
                className="text-[25px]"
              >
                +
              </button>
            </div>
            {errors.guest && touched.guest && (
              <div className=" text-red-400 text-[14px] ">{errors.guest}</div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default StepOne;

StepOne.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};
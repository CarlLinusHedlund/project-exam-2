import { Field } from "formik";
import PropTypes from "prop-types";

const AddDetails = ({ errors, touched, values, setFieldValue }) => {
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
    <div className="flex flex-col lg:flex-row gap-10 px-3">
      <div className="flex w-full lg:w-[60%] gap-10 flex-col lg:justify-between">
        <label
          htmlFor="title"
          className="text-primaryDark relative flex flex-col text-[14px] w-full  "
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
          htmlFor="description"
          className="text-primaryDark relative flex flex-col text-[14px] w-full "
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
        {/* Add more fields for Step 1 */}
      </div>
      <div className="flex w-full flex-col gap-10 lg:w-[40%] lg:justify-between">
        <label
          htmlFor="pricePerNight"
          className="text-primaryDark relative flex flex-col text-[14px] w-full "
        >
          Price per night
          <Field
            className={` p-2 bg-primaryWhite duration-500 border-[1px] ${
              errors.pricePerNight && touched.pricePerNight
                ? "border-red-400"
                : "border-gray-300"
            }  rounded-[10px] outline-none `}
            type="number"
            min={1}
            id="pricePerNight"
            name="pricePerNight"
          />
          {/* <ErrorMessage name="title" component="div" className="error" /> */}
          {errors.pricePerNight && touched.pricePerNight && (
            <div className=" text-red-400 absolute -bottom-6 text-[14px] ">
              {errors.pricePerNight}
            </div>
          )}
        </label>
        <div className="w-full flex flex-col gap-10 justify-between">
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
                className="p-2 w-14 flex justify-center bg-primaryWhite text-center items-center"
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
          <label
            htmlFor="type"
            className="text-primaryDark flex flex-col w-full text-[14px]"
          >
            Type
            <div
              className={`w-full ${
                errors.type && touched.type
                  ? "border-red-400"
                  : " border-gray-300"
              } p-1 bg-primaryWhite border-[1px] relative rounded-[10px]`}
            >
              <Field
                as="select"
                id="type"
                name="type"
                className=" w-full bg-primaryWhite py-2 text-[14px] duration-500 font-light  outline-none"
              >
                <option value="">Select Type</option>
                <option value="boat">Boat</option>
                <option value="cabin">Cabin</option>
                <option value="hotel">Hotel</option>
                <option value="house">House</option>
                <option value="caravan">Caravan</option>
                <option value="apartment">Apartment</option>
              </Field>
              {errors.type && touched.type && (
                <div className="text-red-400 text-[14px] absolute -bottom-6 left-1 ">
                  {errors.type}
                </div>
              )}
            </div>
          </label>
          <label
            htmlFor="meta"
            className="text-primaryDark flex flex-col w-full text-[14px]"
          >
            Meta
            <div
              className={`w-full ${
                errors.meta && touched.meta
                  ? "border-red-400"
                  : " border-gray-300"
              } p-1 bg-primaryWhite border-[1px] relative rounded-[10px]`}
            >
              <Field
                multible
                as="select"
                id="meta"
                name="meta"
                className=" w-full bg-primaryWhite py-2 text-[14px] duration-500 font-light  outline-none"
              >
                <option value="wifi">Wifi</option>
                <option value="parking">Parking</option>
                <option value="breakfast">Breakfast</option>
                <option value="pets">Pets</option>
                <option value="pool">Pool</option>
                <option value="gym">Gym</option>
                <option value="air_conditioning">Air Conditioning</option>
                <option value="heating">Heating</option>
                <option value="kitchen">Kitchen</option>
                <option value="tv">Tv</option>
                <option value="washing_machine">Washing Machine</option>
              </Field>
              {errors.meta && touched.meta && (
                <div className="text-red-400 text-[14px] absolute -bottom-6 left-1 ">
                  {errors.meta}
                </div>
              )}
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AddDetails;

AddDetails.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

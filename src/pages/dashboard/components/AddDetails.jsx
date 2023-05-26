import { Field } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import WifiSvg, {
  AirConditionSvg,
  BreakfastSvg,
  GymSvg,
  HeatingSvg,
  KitchenSvg,
  ParkingSvg,
  PetSvg,
  PoolSvg,
  TvSvg,
  WashingMachineSvg,
} from "../../../components/MetaSvgs";

const AddDetails = ({ errors, touched, values, setFieldValue }) => {
  const [checkbox, setCheckbox] = useState(false);
  const handleAddGuest = (values, setFieldValue) => {
    const currentGuests = values || 0;
    const newGuests = currentGuests + 1;
    setFieldValue("guest", newGuests);
  };

  const metas = [
    { id: 1, name: "Wifi", value: "wifi", svg: <WifiSvg color="#252525" /> },
    {
      id: 2,
      name: "Parking",
      value: "parking",
      svg: <ParkingSvg color="#252525" />,
    },

    {
      id: 3,
      name: "Breakfast",
      value: "breakfast",
      svg: <BreakfastSvg color="#252525" />,
    },
    { id: 4, name: "Pets", value: "pets", svg: <PetSvg color="#252525" /> },
    { id: 5, name: "Pool", value: "pool", svg: <PoolSvg color="#252525" /> },
    { id: 6, name: "Gym", value: "gym", svg: <GymSvg color="#252525" /> },
    {
      id: 7,
      name: "Air Conditioning",
      value: "air_conditioning",
      svg: <AirConditionSvg color="#252525" />,
    },
    {
      id: 8,
      name: "Heating",
      value: "heating",
      svg: <HeatingSvg color="#252525" />,
    },
    {
      id: 9,
      name: "Kitchen",
      value: "kitchen",
      svg: <KitchenSvg color="#252525" />,
    },
    { id: 10, name: "Tv", value: "tv", svg: <TvSvg color="#252525" /> },
    {
      id: 11,
      name: "Washing Machine",
      value: "washing_machine",
      svg: <WashingMachineSvg color="#252525" />,
    },
  ];

  const handleRemoveGuest = (values, setFieldValue) => {
    const currentGuests = values || 0;
    const newGuests = Math.max(currentGuests - 1, 1); // Minimum value is 1
    setFieldValue("guest", newGuests);
  };

  const openCheckbox = () => {
    setCheckbox(!checkbox);
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
        <fieldset>
          <legend
            onClick={openCheckbox}
            className="text-base font-light w-full leading-6 text-primaryDark"
          >
            <p className="text-[14px] text-gray-500">Add amenities</p>
            <div className="border-[1px] flex justify-between rounded-[10px] px-2 py-3 w-full border-gray-300">
              <p className="text-[14px]">Select amenities</p>
              <img src="../arrow.svg" alt="" />
            </div>
          </legend>
          <div
            className={`bg-[#ffffff4a] ${
              checkbox ? "flex" : "hidden"
            } flex items-center justify-center backdrop-blur-[2px] py-20 p-6 sm:p-20 w-screen top-0 left-0 right-0 bottom-0 h-screen fixed z-10`}
          >
            <div
              className={` bg-primaryWhite relative max-w-md w-full max-h-[500px] px-10 divide-y duration-300 divide-gray-200 border-b border-t overflow-y-scroll shadow-lg rounded-[10px] flex flex-col gap-2 border-gray-200`}
            >
              <div className="sticky flex items-center justify-end z-10 w-full top-0 left-0 right-0 py-10 h-20 bg-primaryWhite">
                <img
                  className=" duration-300 cursor-pointer lg:hover:scale-105 "
                  onClick={openCheckbox}
                  src="../close.svg"
                  alt=""
                />
              </div>
              {metas.map((meta, metaIdx) => (
                <label
                  htmlFor={`${meta.value}`}
                  key={metaIdx}
                  className="relative flex items-center justify-between w-full py-4"
                >
                  <div className="flex gap-2 items-center">
                    {meta.svg}
                    <p className="">{meta.name}</p>
                  </div>

                  <input
                    id={`${meta.value}`}
                    name={`${meta.value}`}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue(`meta.${e.target.id}`, e.target.checked);
                      } else {
                        setFieldValue(`meta.${e.target.id}`, e.target.checked);
                      }
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </fieldset>
        {errors.meta && touched.meta && (
          <div className="text-red-400 text-[14px] absolute -bottom-6 left-1 ">
            {errors.meta}
          </div>
        )}
        {/* Add more fields for Step 1 */}
      </div>
      <div className="flex w-full flex-col gap-10 lg:w-[40%]">
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
            {/* <div
              className={`w-full ${
                errors.meta && touched.meta
                  ? "border-red-400"
                  : " border-gray-300"
              } p-1 bg-primaryWhite border-[1px] relative rounded-[10px]`}
            > */}
            {/* <Field
                multible
                as="checkbox"
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
              </Field> */}
            {/* </div> */}
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

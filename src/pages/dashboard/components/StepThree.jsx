import { Field } from "formik";
import PropTypes from "prop-types";

export default function StepThree({ errors, touched }) {
  return (
    <div>
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
    </div>
  );
}

StepThree.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

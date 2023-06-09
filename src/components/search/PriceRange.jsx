import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

export default function RangeSlider({
  min,
  max,
  step,
  priceCap,
  initialMin,
  initialMax,
  setMinNumber,
  setMaxNumber,
}) {
  const progressRef = useRef(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax - 1);

  useEffect(() => {
    setMinNumber(minValue);
    setMaxNumber(maxValue);
  }, [minValue, maxValue, setMinNumber, setMaxNumber]);
  const handleMin = (e) => {
    if (maxValue - minValue > priceCap && maxValue < max) {
      // eslint-disable-next-line no-empty
      if (parseInt(e.target.value) > parseInt(maxValue)) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e) => {
    if (maxValue - minValue > priceCap && maxValue < max) {
      // eslint-disable-next-line no-empty
      if (parseInt(e.target.value) < parseInt(minValue)) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    progressRef.current.style.left = (minValue / max) * step + "%";
    progressRef.current.style.right = step - (maxValue / max) * step + "%";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [minValue, maxValue]);

  return (
    <>
      <div className="w-full relative h-1">
        <div
          ref={progressRef}
          className="absolute -top-1 h-1 bg-primaryDark rounded-md "
        ></div>
        <input
          onChange={handleMin}
          value={minValue}
          min={min + 100}
          className=" w-full absolute appearance-none bg-transparent top-[2px] h-1 pointer-events-none "
          step={step}
          max={max - 1}
          type="range"
          name="minpricePerNight"
          id="minpricePerNight"
        />
        <input
          onChange={handleMax}
          value={maxValue}
          max={max - 1}
          min={min + 100}
          className=" w-full absolute appearance-none bg-transparent top-[2px] h-1 pointer-events-none"
          step={step}
          type="range"
          name="maxpricePerNight"
          id="maxpricePerNight"
        />
      </div>
      <div className="w-full flex justify-between pt-8">
        <div className="relative h-fit w-fit bg-primaryWhite rounded-[5px] px-2 border-[1px] border-gray-300">
          <label
            htmlFor="minPrice"
            className="text-[12px] absolute -top-5 left-1 text-gray-300 "
          >
            Min Price
          </label>
          <div className="flex items-center gap-1">
            <span className=" text-gray-300 text-[12px] ">NOK</span>
            <input
              onChange={(e) => setMinValue(e.target.value)}
              value={minValue}
              min={min}
              max={max}
              disabled
              className=" text-center py-2 w-[50px] outline-none bg-primaryWhite text-[14px] "
              type="number"
              name="minPrice"
              id="minPrice"
            />
          </div>
        </div>
        <div className="relative h-fit w-fit bg-primaryWhite rounded-[5px] px-2 border-[1px] border-gray-300">
          <label
            htmlFor="minPrice"
            className="text-[12px] absolute -top-5 left-1 text-gray-300"
          >
            Max Price
          </label>
          <div className="flex items-center gap-1">
            <span className="text-gray-300 text-[12px] ">NOK</span>
            <input
              onChange={(e) => setMaxValue(e.target.value)}
              value={maxValue}
              min={min}
              max={max}
              disabled
              className=" text-center py-2 w-[50px] outline-none bg-primaryWhite text-[14px]"
              type="number"
              name="maxPrice"
              id="maxPrice"
            />
          </div>
        </div>
      </div>
    </>
  );
}

RangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  priceCap: PropTypes.number.isRequired,
  initialMin: PropTypes.number.isRequired,
  initialMax: PropTypes.number.isRequired,
  setMinNumber: PropTypes.func.isRequired,
  setMaxNumber: PropTypes.func.isRequired,
};

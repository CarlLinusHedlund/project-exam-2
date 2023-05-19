import PropTypes from "prop-types";
import WifiSvg, {
  AirConditionSvg,
  BreakfastSvg,
  GymSvg,
  KitchenSvg,
  ParkingSvg,
  PetSvg,
  PoolSvg,
  TvSvg,
  WashingMachineSvg,
} from "../../../components/MetaSvgs";

export default function FeaturesTab({ meta }) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-3 pt-10 pb-5 max-w-md">
      <div
        className={`  relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.wifi ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <WifiSvg color={`${meta.wifi ? "#252525" : "#C9C9C9"}`} /> Wifi
        {!meta.wifi && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.parking ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <ParkingSvg color={`${meta.parking ? "#252525" : "#C9C9C9"}`} /> Parking
        {!meta.parking && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.breakfast ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <BreakfastSvg color={`${meta.breakfast ? "#252525" : "#C9C9C9"}`} />{" "}
        Breakfast
        {!meta.breakfast && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={`  relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.pets ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <PetSvg color={`${meta.pets ? "#252525" : "#C9C9C9"}`} /> Pets
        {!meta.pets && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.pool ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <PoolSvg color={`${meta.pool ? "#252525" : "#C9C9C9"}`} /> pool
        {!meta.pool && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.gym ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <GymSvg color={`${meta.gym ? "#252525" : "#C9C9C9"}`} /> Gym
        {!meta.gym && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.air_conditioning ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <AirConditionSvg
          color={`${meta.air_conditioning ? "#252525" : "#C9C9C9"}`}
        />{" "}
        Air condition
        {!meta.air_conditioning && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.heating ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <ParkingSvg color={`${meta.heating ? "#252525" : "#C9C9C9"}`} /> Heating
        {!meta.heating && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.kitchen ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <KitchenSvg color={`${meta.kitchen ? "#252525" : "#C9C9C9"}`} /> Kitchen
        {!meta.kitchen && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.tv ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <TvSvg color={`${meta.tv ? "#252525" : "#C9C9C9"}`} /> Tv
        {!meta.tv && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>

      <div
        className={` relative text-[14px] px-1 flex justify-center items-center gap-3 ${
          meta.washing_machine ? "text-primaryDark" : "text-gray-300"
        }`}
      >
        <WashingMachineSvg color={`${meta.tv ? "#252525" : "#C9C9C9"}`} />{" "}
        Washing machine
        {!meta.washing_machine && (
          <div className="absolute h-[1px] w-full bg-gray-300"></div>
        )}
      </div>
    </div>
  );
}

FeaturesTab.propTypes = {
  meta: PropTypes.object,
};

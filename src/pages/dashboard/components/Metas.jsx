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

export default function Metas() {
  return [
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
}

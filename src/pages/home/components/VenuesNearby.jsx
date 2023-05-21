import { useEffect } from "react";
import {
  // setError,
  // setLoading,
  setLocation,
} from "../../../store/modules/GeoloactionSlice";
import { client } from "../../../utils/PexelsClient";
import { useDispatch, useSelector } from "react-redux";
import { setImg, setQuery } from "../../../store/modules/PexelsSlice";

export default function VenuesNearby() {
  const location = useSelector((state) => state.geolocation.location);
  // const isLoading = useSelector((state) => state.geolocation.isLoading);
  const error = useSelector((state) => state.geolocation.error);
  const query = useSelector((state) => state.pexelsImg.query);
  const img = useSelector((state) => state.pexelsImg.img);
  const dispatch = useDispatch();

  // const query = "Norway";
  console.log(query);
  console.log(location);

  useEffect(() => {
    if (location.country === null) {
      // Only fetch if the location data is not available in the state
      const getLocation = () => {
        fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) => {
            console.log("data", data);
            dispatch(
              setLocation({ country: data.country_name, city: data.city })
            );
            dispatch(setQuery(data.country_name));
          });
      };
      getLocation();
    }
  }, [dispatch, location]);

  if (query && !img) {
    client.photos.search({ query, per_page: 1 }).then((photos) => {
      console.log("pexels: ", photos);
      dispatch(setImg({ src: photos.photos[0].src.large }));
    });
  }

  console.log("query", query);
  console.log("location", location);
  console.log("img", img);

  if (error) {
    return null;
  }

  if (location && img) {
    return (
      <div className="flex flex-col gap-5 font-poppins pt-20">
        <h2 className="text-[30px] font-semibold ">Something to explore?</h2>
        <img className="w-full h-full" src={img.src} alt="" />
      </div>
    );
  }
}

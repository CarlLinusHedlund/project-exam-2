import { useEffect, useState } from "react";
import {
  // setError,
  setLoading,
  // setLocation,
} from "../../../store/modules/GeoloactionSlice";
import { client } from "../../../utils/PexelsClient";
import { useDispatch, useSelector } from "react-redux";

export default function VenuesNearby() {
  const location = useSelector((state) => state.geolocation.location);
  const isLoading = useSelector((state) => state.geolocation.isLoading);
  const error = useSelector((state) => state.geolocation.error);
  const dispatch = useDispatch();

  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const query = "Norway";

  client.photos.search({ query, per_page: 1 }).then((photos) => {
    console.log("pexels: ", photos);
  });

  useEffect(() => {
    if (!location) {
      // Only fetch if the location data is not available in the state
      dispatch(setLoading(true));
      // Call Mapbox or any other geolocation service
      // Once you get the location data, dispatch setLocation
      // If there's an error, dispatch setError
      // Finally, dispatch setLoading(false) to indicate the end of loading
    }
  }, []);

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      if (latitude && longitude) {
        setLat(latitude);
        setLon(longitude);
      }
      console.log(lat);
      console.log(lon);

      // Call the PostgreSQL function using Supabase's rpc method

      // const fetchData = async () => {
      //   const { data, error } = await supabase.rpc("get_nearby_venues", {
      //     lat,
      //     lon,
      //     radius,
      //   });
      //   // handle data and error
      //   if (error) {
      //     console.log(error);
      //   }
      //   if (data) {
      //     console.log(data);
      //   }
      // };
      // fetchData();
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  if (isLoading) {
    return <div>Loading geolocation...</div>;
  }

  if (error) {
    return (
      <div>Error occurred while fetching geolocation: {error.message}</div>
    );
  }

  return <div>VenuesNearby</div>;
}

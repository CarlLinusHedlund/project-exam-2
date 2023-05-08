import { supabase } from "../../../Supabase";

export default function VenuesNearby() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      const radius = 10; // search within 10 kilometers
      console.log(lat);
      console.log(lon);
      console.log(radius);
      // Call the PostgreSQL function using Supabase's rpc method

      const fetchData = async () => {
        const { data, error } = await supabase.rpc("get_nearby_venues", {
          lat,
          lon,
          radius,
        });
        // handle data and error
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
        }
      };
      fetchData();
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }

  return <div>VenuesNearby</div>;
}

import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import PropTypes from "prop-types";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Geocoder({ setFieldValue }) {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_KEY,
    marker: false,
    collapsed: true,
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    const street = e.result.text;
    const address = e.result.address;
    const context = e.result.context;
    // console.log("geometry", context);
    // console.log("data", street);

    let streetValue = "";
    if (street && address) {
      streetValue = `${street} ${address}`;
    } else if (street) {
      streetValue = street;
    }

    let zip = "";
    let city = "";
    let country = "";

    context.forEach((item) => {
      if (item.id.startsWith("postcode")) {
        zip = item.text;
      } else if (item.id.startsWith("place")) {
        city = item.text;
      } else if (item.id.startsWith("country")) {
        country = item.text;
      }
    });

    setFieldValue("location.coordinates", { lon: coords[0], lat: coords[1] });
    setFieldValue("location.address", {
      street: streetValue,
      zip,
      city,
      country,
    });
  });

  return null;
}

Geocoder.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
};

export default Geocoder;

import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import PropTypes from "prop-types";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

function ReverseGeocoder() {
  const ctrl = new MapBoxGeocoder({
    accessToken: import.meta.env.VITE_MAPBOX_KEY,
  });
  useControl(() => ctrl);
  return null;
}

ReverseGeocoder.propTypes = {
  // location: PropTypes.object.isRequired,
  setLocation: PropTypes.func.isRequired,
};

export default ReverseGeocoder;

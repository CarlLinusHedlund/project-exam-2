// import { Field } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import { GeolocateControl, Map, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default function AddLocation({ errors, touched, values }) {
  const [location, setLocation] = useState({
    lng: 10.743657481175177,
    lat: 59.90175372688918,
  });

  const handleChange = (event) => {
    const lnglat = event.target.getLngLat();
    setLocation(lnglat);
    console.log("location", location);
  };

  return (
    <div className="h-[350px] overflow-hidden relative rounded-[10px] ">
      <Map
        className="rounded-xl"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        initialViewState={{
          longitude: location.lng,
          latitude: location.lat,
          zoom: 8,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        {/* <MapboxGeocoder></MapboxGeocoder> */}
        <NavigationControl position="bottom-right"></NavigationControl>
        <GeolocateControl
        // position={isTabletOrMobile ? "top-left" : "top-right"}
        ></GeolocateControl>
        <Marker
          onDragEnd={handleChange}
          latitude={location.lat}
          longitude={location.lng}
          draggable
          // onChange={handleChange(event)}
        />
      </Map>
    </div>
  );
}

AddLocation.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

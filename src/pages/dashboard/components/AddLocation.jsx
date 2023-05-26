import PropTypes from "prop-types";
import { GeolocateControl, Map, Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";
import "./index.css";

export default function AddLocation({ values, setFieldValue, errors }) {
  const fetchLocationData = async (lnglat) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      lnglat.lng
    },${lnglat.lat}.json?access_token=${import.meta.env.VITE_MAPBOX_KEY}`;
    try {
      let streetValue = "";
      let zip = "";
      let city = "";
      let country = "";
      const response = await fetch(url);
      const responseJSON = await response.json();
      const featuresArr = responseJSON.features;
      featuresArr.forEach((item) => {
        if (item.id.startsWith("postcode")) {
          zip = item.text;
        } else if (item.id.startsWith("place")) {
          city = item.text;
        } else if (item.id.startsWith("country")) {
          country = item.text;
        } else if (item.id.startsWith("address")) {
          if (item.text && item.address) {
            streetValue = `${item.text} ${item.address}`;
          } else if (item.text) {
            streetValue = item.text;
          }
        }
      });
      setFieldValue("location.coordinates", lnglat);
      setFieldValue("location.address", {
        street: streetValue,
        zip,
        city,
        country,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (event) => {
    const lnglat = event.target.getLngLat();
    await fetchLocationData(lnglat);
  };

  const setGeoLocation = async (e) => {
    await fetchLocationData({
      lng: e.coords.longitude,
      lat: e.coords.latitude,
    });
  };

  return (
    <>
      {values.location.coordinates && (
        <div className="h-[350px] w-full overflow-hidden relative md:rounded-[10px] ">
          <Map
            className="rounded-xl"
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
            initialViewState={{
              longitude: values.location.coordinates.lon,
              latitude: values.location.coordinates.lat,
              zoom: 8,
            }}
            mapStyle="mapbox://styles/mapbox/dark-v11"
          >
            <NavigationControl position="bottom-right"></NavigationControl>
            <GeolocateControl
              onGeolocate={setGeoLocation}
              trackUserLocation
              position="top-right"
            ></GeolocateControl>
            <Marker
              onDragEnd={handleChange}
              latitude={values.location.coordinates.lat}
              longitude={values.location.coordinates.lon}
              draggable
            />
            <Geocoder setFieldValue={setFieldValue} />
          </Map>
        </div>
      )}
      {errors.location && <div className="">{errors.location}</div>}
    </>
  );
}

AddLocation.propTypes = {
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func.isRequired,
};

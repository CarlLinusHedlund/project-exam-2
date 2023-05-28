import { Map, Marker } from "react-map-gl";
import PropTypes from "prop-types";

export default function LocationTab({ location, venueImg }) {
  console.log(location);
  console.log(venueImg);
  return (
    <div className="h-[350px] w-full overflow-hidden relative mt-10 md:rounded-[10px] ">
      <Map
        initialViewState={{
          longitude: location.coordinates.lon,
          latitude: location.coordinates.lat,
          zoom: 12,
        }}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        className="rounded-[10px] h-full w-full bottom-0 top-0 right-0 left-0 absolute"
      >
        <Marker
          latitude={location.coordinates.lat}
          longitude={location.coordinates.lon}
        >
          {venueImg ? (
            <img
              className="rounded-full object-cover h-14 w-14 border-2 border-primaryWhite "
              src={venueImg}
              alt=""
            />
          ) : (
            <div className="rounded-full object-cover h-16 w-16 border-2 bg-primaryWhite"></div>
          )}
        </Marker>
      </Map>
    </div>
  );
}

LocationTab.propTypes = {
  location: PropTypes.object,
  venueImg: PropTypes.string,
};

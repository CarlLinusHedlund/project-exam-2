import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ReactMapGL, {
  GeolocateControl,
  Marker,
  NavigationControl,
} from "react-map-gl";
import { useGetOnMapVenuesQuery } from "../../../store/modules/ApiSlice";
import { useEffect, useRef, useState } from "react";
import useSupercluster from "use-supercluster";
import HomeSvg from "../../../components/DynamicSvgs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "swiper/css";
import "./map.css";
import "swiper/css/pagination";

export default function Map({ searchQuery, venues, setVenues }) {
  console.log("venues", venues);
  const [viewport, setViewport] = useState({
    latitude: null,
    longitude: null,
    center: [null, null],
    zoom: 11,
    width: "100%",
    height: "100%",
  });

  // console.log(viewport);
  // console.log("searchQuery", searchQuery);

  const [fetchBounds, setFetchBounds] = useState([0, 0, 0, 0]);
  const onViewportChange = (newViewport) => {
    setViewport({ ...viewport, ...newViewport });
  };

  const mapRef = useRef();

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : fetchBounds;

  const { data, error, isLoading } = useGetOnMapVenuesQuery(fetchBounds);

  useEffect(() => {
    if (data) {
      if (data.length > 0) {
        setVenues(data);
      }
    }
  }, [fetchBounds, data, setVenues]);

  useEffect(() => {
    setViewport({
      latitude: searchQuery[1],
      longitude: searchQuery[0],
      center: [searchQuery[1], searchQuery[0]],
      zoom: 12,
      width: "100%",
      height: "100%",
    });
    if (searchQuery.length > 0) {
      const timeoutId = setTimeout(() => {
        const queryBounds = mapRef.current
          .getMap()
          .getBounds()
          .toArray()
          .flat();

        setFetchBounds(queryBounds);
      }, 1000); // Adjust the timeout duration (in milliseconds) as needed

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchQuery, setFetchBounds]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const points = venues.map((venue) => ({
    type: "Feature",
    properties: {
      title: venue.title,
      cluster: false,
      venueId: venue.id,
      venuePrice: venue.price_per_night,
      category: "anti-social-behaviour",
      type: venue.type,
      img: venue.media,
      street: venue.location.address.street,
      city: venue.location.address.city,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(venue.location.coordinates.lon),
        parseFloat(venue.location.coordinates.lat),
      ],
    },
  }));

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { clusters } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds: bounds,
    options: { radius: 85, maxZoom: 20 },
  });
  return (
    <>
      {viewport && viewport.latitude && viewport.longitude && (
        <div className="w-full h-[500px] rounded-[10px]">
          <ReactMapGL
            {...viewport}
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
            mapStyle="mapbox://styles/mapbox/dark-v11"
            onViewportChange={onViewportChange}
            onMove={(evt) => {
              setViewport(evt.viewState);
            }}
            onMoveEnd={() => {
              setFetchBounds(bounds);
            }}
            style={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            maxZoom={19}
          >
            {/* Loading spinner in fetch/Load for the map */}
            {isLoading && (
              <div className="absolute left-4 top-4 z-30 p-4">
                <div className="" role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <GeolocateControl position="top-right"></GeolocateControl>
            {clusters.map((cluster) => {
              // every cluster point has coordinates
              const [longitude, latitude] = cluster.geometry.coordinates;
              // the point may be either a cluster or a crime point
              const { cluster: isCluster, point_count: pointCount } =
                cluster.properties;

              // we have a cluster to render
              if (isCluster) {
                return (
                  <Marker
                    key={`cluster-${cluster.id}`}
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
                      {pointCount}
                    </div>
                  </Marker>
                );
              }

              if (!isCluster) {
                const imgs = cluster.properties.img;
                // we have a single point (crime) to render
                return (
                  <Marker
                    key={`venue-${cluster.properties.venueId}`}
                    latitude={latitude}
                    longitude={longitude}
                  >
                    <div
                      className={`group relative flex items-center justify-center rounded-full  duration-150 ease-in-out hover:scale-110`}
                    >
                      {cluster.properties.img ? (
                        <>
                          <div className="absolute p-[2px] overflow-hidden hidden top-0 w-[250px] h-[200px] -translate-y-6 rounded-lg bg-white text-center opacity-0 duration-200  flex-col gap-2 ease-in-out group-hover:-translate-y-12  lg:group-hover:flex group-hover:opacity-100 ">
                            <Swiper
                              loop={true}
                              navigation={true}
                              pagination={{
                                clickable: true,
                                dynamicBullets: true,
                              }}
                              modules={[Pagination, Navigation]}
                              className=" relative rounded-[10px] mySwiper h-[60%] w-full"
                            >
                              {cluster.properties.street && (
                                <div className="bg-[#e8e8e880] rounded-[10px] absolute top-2 left-2 px-3 py-1 w-fit h-fit z-10 backdrop-blur-[3px]  ">
                                  {cluster.properties.city},{" "}
                                  {cluster.properties.street}
                                </div>
                              )}

                              {imgs.map((img, index) => (
                                <SwiperSlide
                                  className=" shadow-xl relative w-full h-full"
                                  key={index}
                                >
                                  <div className=" absolute top-0 left-0 right-0 w-full h-full bg-[#0000002c]"></div>
                                  <img
                                    className="w-full h-full object-cover"
                                    src={img}
                                    alt={cluster.properties.title}
                                  />
                                </SwiperSlide>
                              ))}
                            </Swiper>
                            <div className="flex w-full justify-between flex-col items-start h-[40%] px-3 pb-3 overflow-hidden ">
                              <p className="text-[16px] whitespace-nowrap text-ellipsis">
                                {cluster.properties.title}
                              </p>
                              <div className="flex w-full items-center gap-2 justify-between">
                                <p className="text-[14px] font-semibold">
                                  {cluster.properties.venuePrice}{" "}
                                  <span className="">NOK</span>
                                </p>
                                <Link
                                  to={`/venue/${cluster.properties.venueId}`}
                                  className=" hover:-translate-y-1 font-semibold border-[1px] border-primaryCoral duration-300 hover:bg-primaryCoral hover:text-primaryDark cursor-pointer flex justify-center items-center w-1/2 h-8 rounded-[10px]"
                                >
                                  View venue
                                </Link>
                              </div>
                            </div>
                          </div>
                          <Link to={`/venue/${cluster.properties.venueId}`}>
                            <img
                              className="rounded-full w-12 h-12 border-primaryWhite border-2 "
                              src={cluster.properties.img[0]}
                              alt={cluster.properties.title}
                            />
                          </Link>
                        </>
                      ) : (
                        <Link to={`/venue/${cluster.properties.venueId}`}>
                          <HomeSvg width="40px" height="40px" color="#ffffff" />
                        </Link>
                      )}
                    </div>
                  </Marker>
                );
              }
            })}
            <NavigationControl position="bottom-right" />
          </ReactMapGL>
        </div>
      )}
    </>
  );
}

Map.propTypes = {
  searchQuery: PropTypes.array,
  setVenues: PropTypes.func,
  venues: PropTypes.array,
};

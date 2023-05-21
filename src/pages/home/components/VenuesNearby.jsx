import { useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";

import {
  // setError,
  // setLoading,
  setLocation,
} from "../../../store/modules/GeoloactionSlice";
import { client } from "../../../utils/PexelsClient";
import { useDispatch, useSelector } from "react-redux";
import { setImg, setQuery } from "../../../store/modules/PexelsSlice";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

export default function VenuesNearby() {
  const location = useSelector((state) => state.geolocation.location);
  // const isLoading = useSelector((state) => state.geolocation.isLoading);
  const error = useSelector((state) => state.geolocation.error);
  const query = useSelector((state) => state.pexelsImg.query);
  const img = useSelector((state) => state.pexelsImg.img);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  // const query = "Norway";
  // console.log(query);
  // console.log(location);

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
      dispatch(setImg({ src: photos.photos[0] }));
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
      <div className="flex md:h-screen flex-col gap-5 font-poppins w-full py-20">
        <h2 className="text-[30px] font-semibold ">
          Something to explore nearby?
        </h2>
        {!isMobile && (
          <div className=" w-full grid grid-rows-2 grid-cols-7 gap-5 max-h-[400px]">
            <Link
              to={`/venues/country=${location.country}`}
              className=" cursor-pointer group relative cols-span-3 row-span-2 col-start-1 col-end-4 hover:scale-[1.01] hover:shadow-2xl duration-200 rounded-[10px] "
            >
              <div className=" absolute w-full h-full top-0 left-0 bottom-0 right-0 duration-300 bg-[#00000017] group-hover:bg-[#0000002c] rounded-[10px] "></div>
              <div className=" absolute bottom-5 left-5 ">
                <h2 className="duration-500 translate-x-5 group-hover:translate-x-0 text-primaryWhite opacity-0 group-hover:opacity-100 text-[20px] ">
                  Explore venues in
                </h2>
                <h3 className=" font-semibold leading-8 -translate-y-10 group-hover:translate-y-0 duration-500 text-primaryWhite  text-[40px] ">
                  {location.country}
                </h3>
              </div>
              <img
                className=" w-full h-full rounded-[10px]"
                src={img.src.src.large}
                alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
              />
            </Link>
            <Link
              to={`/venues/country=${location.country}/type=apartment/city=${location.city}`}
              className="cursor-pointer group relative cols-span-2 row-span-1 row-start-1 col-start-4 col-end-6 rounded-[10px] hover:scale-[1.03] hover:shadow-2xl duration-200"
            >
              <div className=" absolute w-full h-full top-0 left-0 bottom-0 right-0 duration-300 bg-[#00000017] group-hover:bg-[#0000002c] rounded-[10px] "></div>
              <div className=" absolute bottom-5 left-5 ">
                <h2 className="duration-500 translate-x-5 group-hover:translate-x-0 text-primaryWhite opacity-0 group-hover:opacity-100 text-[16px] ">
                  In {location.city}
                </h2>
                <h3 className=" font-semibold leading-8 -translate-y-10 group-hover:translate-y-0 duration-500 text-primaryWhite  text-[25px] ">
                  Apartments
                </h3>
              </div>
              <img
                className="w-full h-full rounded-[10px] object-cover"
                src="../apartmentImg.jpg"
                alt={`img of hotel in ${location.city}`}
              />
            </Link>
            <Link
              to={`/venues/country=${location.country}/type=hotel/city=${location.city}`}
              className="cursor-pointer group relative cols-span-2 row-span-1 row-start-2 col-start-4 col-end-6 rounded-[10px] hover:scale-[1.03] hover:shadow-2xl duration-200"
            >
              <div className=" absolute w-full h-full top-0 left-0 bottom-0 right-0 duration-300 bg-[#00000017] group-hover:bg-[#0000002c] rounded-[10px] "></div>
              <div className=" absolute bottom-5 left-5 ">
                <h2 className="duration-500 translate-x-5 group-hover:translate-x-0 text-primaryWhite opacity-0 group-hover:opacity-100 text-[16px] ">
                  In {location.city}
                </h2>
                <h3 className=" font-semibold leading-8 -translate-y-10 group-hover:translate-y-0 duration-500 text-primaryWhite  text-[25px] ">
                  Hotels
                </h3>
              </div>
              <img
                className="w-full h-full rounded-[10px] object-cover"
                src="../hotelRoom.jpg"
                alt={`img of hotel in ${location.city}`}
              />
            </Link>
            <Link
              to={`/venues/country=${location.country}/type=house/city=${location.city}`}
              className=" cursor-pointer group relative cols-span-2 row-span-2 col-start-6 col-end-8 rounded-[10px] hover:scale-[1.02] hover:shadow-2xl duration-200"
            >
              <div className=" absolute w-full h-full top-0 left-0 bottom-0 right-0 duration-300 bg-[#00000017] group-hover:bg-[#0000002c] rounded-[10px] "></div>
              <div className=" absolute bottom-5 left-5 ">
                <h2 className="duration-500 translate-x-5 group-hover:translate-x-0 text-primaryWhite opacity-0 group-hover:opacity-100 text-[16px] ">
                  In {location.city}
                </h2>
                <h3 className=" font-semibold leading-8 -translate-y-10 group-hover:translate-y-0 duration-500 text-primaryWhite  text-[25px] ">
                  House
                </h3>
              </div>
              <img
                className=" w-full h-full rounded-[10px] object-cover"
                src="../house.jpg"
                alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
              />
            </Link>
          </div>
        )}
        {isMobile && (
          <div>
            <VenuesNearbyMobile location={location} img={img} />
          </div>
        )}
      </div>
    );
  }
}

function VenuesNearbyMobile({ location, img }) {
  console.log("VenuesNearbyMobile", location);
  console.log("VenuesNearbyMobile", img);

  return (
    <Swiper
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className="  mySwiper h-[50vh] min-h-[400px] w-full rounded-[10px]"
    >
      <SwiperSlide></SwiperSlide>
    </Swiper>
  );
}
VenuesNearbyMobile.propTypes = {
  location: PropTypes.object,
  img: PropTypes.object,
};

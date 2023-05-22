import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { setLocation } from "../../../store/modules/GeoloactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { setImg, setQuery } from "../../../store/modules/PexelsSlice";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import pexels from "../../../api/Pexels";

export default function VenuesNearby() {
  const location = useSelector((state) => state.geolocation.location);
  // const isLoading = useSelector((state) => state.geolocation.isLoading);
  const error = useSelector((state) => state.geolocation.error);
  const query = useSelector((state) => state.pexelsImg.query);
  const img = useSelector((state) => state.pexelsImg.img);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  async function getImg(term) {
    try {
      const response = await pexels.get("/v1/search", {
        params: {
          query: term,
          per_page: 1,
        },
      });
      dispatch(setImg({ src: response.data.photos[0] }));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (location.country === null) {
      // Only fetch if the location data is not available in the state
      const getLocation = () => {
        fetch("https://ipapi.co/json/")
          .then((response) => response.json())
          .then((data) => {
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
    getImg(query);
  }

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
                className=" object-cover w-full h-full rounded-[10px]"
                src={img.src.src.large}
                alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
              />
            </Link>
            <Link
              to={`/venues/country=${location.country}/type=apartment/city=${location.city}`}
              className="cursor-pointer group relative cols-span-2 row-span-1 row-start-1 col-start-4 col-end-6 rounded-[10px] hover:scale-[1.03] hover:shadow-2xl duration-200"
            >
              <div className="absolute w-full h-full top-0 left-0 bottom-0 right-0 duration-300  group-hover:bg-[#0000002c] rounded-[10px]"></div>
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
                  Villas
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
  const [activeIndex, setActiveIndex] = useState(0);
  // console.log("activeIndex", activeIndex);
  const handleSlideChange = (swiper) => {
    // console.log("swiper", swiper);
    setActiveIndex(swiper.realIndex);
  };
  // console.log("VenuesNearbyMobile", location);
  // console.log("VenuesNearbyMobile", img);

  return (
    <Swiper
      onSlideChange={handleSlideChange}
      spaceBetween={10}
      autoplay={{
        delay: 2500,
      }}
      loop={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      modules={[Pagination]}
      className={` ${
        activeIndex === 0 || activeIndex === 2 ? "shadow-2xl" : ""
      }  font-poppins relative mySwiper bg-primaryWhite h-[450px] w-full rounded-[10px] duration-200 `}
    >
      <SwiperSlide className=" bg-primaryWhite flex overflow-hidden justify-center items-center text-[40px] rounded-[10px] w-full h-full">
        <Link
          className="relative w-full h-full bg-primaryWhite  "
          to={`/venues/country=${location.country}`}
        >
          <div
            className={` ${
              activeIndex === 0 ? "bg-[#0000004a]" : " bg-none "
            } absolute w-full h-full duration-1000 `}
          ></div>
          <div className="absolute bottom-20 left-4 text-primaryWhite flex flex-col gap-8">
            <div>
              <h3
                className={` ${
                  activeIndex === 0
                    ? " opacity-100 translate-x-0 "
                    : " translate-x-10 opacity-0"
                } font-medium duration-700 delay-150 text-[16px] `}
              >
                Explore venues in
              </h3>
              <h2
                className={` ${
                  activeIndex === 0
                    ? "opacity-100 translate-y-0"
                    : "-translate-y-10 opacity-0"
                } font-semibold leading-7 text-[40px] duration-500 delay-100`}
              >
                Norway
              </h2>
            </div>
            <button
              className={` ${
                activeIndex === 0
                  ? " opacity-100 scale-100 "
                  : "opacity-0 scale-75"
              } text-primaryDark font-medium rounded-[10px] text-[12px] xxs:text-[16px] px-16 xxs:px-20 py-2 bg-primaryWhite duration-500 delay-300 `}
            >
              Venues in {location.country}
            </button>
          </div>
          <img
            className=" w-full h-full object-cover rounded-[10px]"
            src={img.src.src.large}
            alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide className=" bg-primaryWhite flex flex-col gap-5 text-[40px] w-full h-full">
        <Link
          to={`/venues/country=${location.country}/type=apartment/city=${location.city}`}
          className=" bg-primaryWhite relative h-1/2 w-full"
        >
          <div
            className={` ${
              activeIndex === 1 ? "bg-[#0000004a]" : " bg-none "
            } absolute w-full h-full rounded-[10px] duration-1000 `}
          ></div>
          <div className="absolute bottom-10 left-4 text-primaryWhite flex flex-col gap-8">
            <div>
              <h3
                className={` ${
                  activeIndex === 1
                    ? " opacity-100 translate-x-0 "
                    : " translate-x-10 opacity-0"
                } font-semibold delay-300 duration-700 text-[18px] `}
              >
                In {location.city}
              </h3>
              <h2
                className={` ${
                  activeIndex === 1
                    ? "opacity-100 translate-y-0"
                    : "-translate-y-10 opacity-0"
                } font-semibold leading-7 text-[30px] duration-500 delay-100`}
              >
                Apartments
              </h2>
            </div>
            {/* <button
              className={` ${
                activeIndex === 1
                  ? " opacity-100 scale-100 "
                  : "opacity-0 scale-75"
              } text-primaryDark font-medium rounded-[10px] text-[12px] xxs:text-[16px] px-14 xxs:px-18 py-2 bg-primaryWhite duration-500 delay-300 `}
            >
              Apartments in {location.city}
            </button> */}
          </div>
          <img
            className=" w-full h-full object-cover rounded-[10px]"
            src="../apartmentImg.jpg"
            alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
          />
        </Link>
        <Link
          className="relative bg-primaryWhite h-1/2 w-full"
          to={`/venues/country=${location.country}/type=hotel/city=${location.city}`}
        >
          <div
            className={` ${
              activeIndex === 1 ? "bg-[#0000004a]" : " bg-none "
            } absolute w-full rounded-[10px] h-full duration-1000 `}
          ></div>
          <div className="absolute bottom-10 left-4 text-primaryWhite flex flex-col gap-8">
            <div>
              <h3
                className={` ${
                  activeIndex === 1
                    ? " opacity-100 translate-x-0 "
                    : " translate-x-10 opacity-0"
                } font-semibold delay-300 duration-700 text-[18px] `}
              >
                In {location.city}
              </h3>
              <h2
                className={` ${
                  activeIndex === 1
                    ? "opacity-100 translate-y-0"
                    : "-translate-y-10 opacity-0"
                } font-semibold leading-7 text-[30px] duration-500 delay-100`}
              >
                Hotels
              </h2>
            </div>
            {/* <button
              className={` ${
                activeIndex === 1
                  ? " opacity-100 scale-100 "
                  : "opacity-0 scale-75"
              } text-primaryDark font-medium rounded-[10px] text-[12px] xxs:text-[16px] px-14 xxs:px-18 py-2 bg-primaryWhite duration-500 delay-300 `}
            >
              Apartments in {location.city}
            </button> */}
          </div>
          <img
            className=" w-full h-full object-cover rounded-[10px]"
            src="../hotelRoom.jpg"
            alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
          />
        </Link>
      </SwiperSlide>
      <SwiperSlide className=" flex rounded-[10px]  justify-center items-center text-[40px] w-full h-full">
        <Link
          className="reltive h-full w-full "
          to={`/venues/country=${location.country}/type=house/city=${location.city}`}
        >
          <div
            className={` ${
              activeIndex === 2 ? "bg-[#0000004a]" : " bg-none "
            } absolute w-full h-full duration-1000 `}
          ></div>
          <div className="absolute bottom-20 left-4 text-primaryWhite flex flex-col gap-8">
            <div>
              <h3
                className={` ${
                  activeIndex === 2
                    ? " opacity-100 translate-x-0 "
                    : " translate-x-10 opacity-0"
                } font-semibold delay-300 duration-700 text-[18px] `}
              >
                In {location.city}
              </h3>
              <h2
                className={` ${
                  activeIndex === 2
                    ? "opacity-100 translate-y-0"
                    : "-translate-y-10 opacity-0"
                } font-semibold leading-7 text-[40px] duration-500 delay-100`}
              >
                Villas
              </h2>
            </div>
            <button
              className={` ${
                activeIndex === 2
                  ? " opacity-100 scale-100 "
                  : "opacity-0 scale-75"
              } text-primaryDark font-medium rounded-[10px] text-[12px] xxs:text-[16px] px-16 xxs:px-20 py-2 bg-primaryWhite duration-500 delay-300 `}
            >
              House in {location.city}
            </button>
          </div>
          <img
            className=" w-full h-full object-cover rounded-[10px]"
            src="../house.jpg"
            alt={`Photographer: ${img.src.photographer} text for image: ${img.src.alt} Link for image: ${img.src.url}`}
          />
        </Link>
      </SwiperSlide>
    </Swiper>
  );
}
VenuesNearbyMobile.propTypes = {
  location: PropTypes.object,
  img: PropTypes.object,
};

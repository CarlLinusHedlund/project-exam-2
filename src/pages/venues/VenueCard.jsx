import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { LocationSvg } from "../../components/DynamicSvgs";
import { useInView } from "react-intersection-observer";

export function VenueCard({ id, media, title, country, city, price }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px",
  });

  return (
    <motion.div
      ref={ref}
      exit={{ opacity: 0, y: 30 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.5, delay: 0 }}
      className="w-full h-[400px] sm:h-[300px] sm:max-w-[315px] max-h-[290px] rounded-[10px] border-[1px] mx-10 sm:mx-0 p-[5px] border-gray-300 md:hover:scale-105 md:duration-200"
    >
      <Link
        className=" w-full h-full flex flex-col font-poppins "
        to={`/venue/id=${id}`}
        key={id}
      >
        <div className=" relative w-full h-[65%] bg-red-300 rounded-[10px]">
          <div className="absolute z-10 top-0 rounded-[10px] right-0 left-0 w-full h-full hover:opacity-10 duration-200 bg-black opacity-20"></div>
          <img
            className=" rounded-[10px] w-full h-full object-cover"
            src={`${media[0]}`}
            alt={title}
          />
          <div className="z-20 text-[12px] absolute top-[6px] left-2 p-1 rounded-[10px] bg-[#ffffffb6] min-w-[60px] flex items-center gap-2 ">
            <LocationSvg height={"10px"} width={"10px"} color="#252525" />
            <p>
              {city}, {country}
            </p>
          </div>
        </div>
        <div className="h-full w-full p-2">
          <div className="w-full flex flex-col">
            <div className="w-full flex justify-between gap-4">
              <h2 className=" overflow-hidden whitespace-nowrap text-ellipsis text-[16px] font-semibold ">
                {title}wsefsdfsdfsdfsdfsdf
              </h2>
              <p>Rating</p>
            </div>
            <div className="">
              <p className=" text-[14px] font-light text-gray-300 ">
                NOK{" "}
                <span className="text-[20px] font-semibold text-primaryCoral ">
                  {price}
                  <span className=" text-[16px] text-gray-300 font-medium ">
                    /night
                  </span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

VenueCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

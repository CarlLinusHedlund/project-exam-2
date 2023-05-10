// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "../index.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import PropTypes from "prop-types";
import { ArrowSvg } from "../../../components/DynamicSvgs";
import { motion } from "framer-motion";

export function MobileImgContainer({ media, title }) {
  function GoBackHandler() {
    history.back();
  }

  return (
    <div className=" relative rounded-[10px] overflow-hidden ">
      <motion.div
        exit={{ opacity: 0, x: -20, transition: { duration: 0.3 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.6 } }}
        onClick={GoBackHandler}
        className=" rounded-full absolute top-3 left-5 h-10 w-10 z-10 flex items-center justify-center bg-[#0000003f] "
      >
        <ArrowSvg color="#ffffff9e" />
      </motion.div>
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="  mySwiper h-[50vh] min-h-[400px] w-full rounded-[10px]"
      >
        {media.map((img, index) => (
          <SwiperSlide
            className=" shadow-xl relative w-full h-full"
            key={index}
          >
            <div className=" absolute top-0 left-0 right-0 w-full h-full bg-[#0000002c]"></div>
            <img className="w-full h-full object-cover" src={img} alt={title} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

MobileImgContainer.propTypes = {
  media: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
};

import { motion } from "framer-motion";

export default function Herobanner() {
  return (
    <div className="flex flex-col  md:gap-10 md:flex-row md:justify-between md:items-center md:pb-72 md:h-screen">
      <div className="font-poppins max-w-lg md:w-1/2 py-10 ">
        <HerobannerContent />
        <GetInfoHolidaze />
      </div>
      <div className="w-full md:w-1/2">
        <HerobannerImgContainer />
      </div>
    </div>
  );
}

function HerobannerContent() {
  return (
    <>
      <motion.h1
        exit={{ x: -50, transition: { duration: 0.2 } }}
        initial={{ x: -50 }}
        animate={{ x: 0, transition: { duration: 0.5 } }}
        className=" whitespace-nowrap text-primaryDark text-[38px] xxs:text-[45px] sm:text-[55px] md:text-[50px] lg:text-[65px] font-extrabold leading-[3rem] sm:leading-[4rem] smd:leading-[4.5rem] lg:leading-[5rem]  "
      >
        EXPLORE YOUR <br /> PLACE TO STAY
      </motion.h1>
      <motion.h3
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6 } }}
        className=" text-primaryDark text-[16px] md:text-[20px] font-light sm:max-w-[400px] md:max-w-lg "
      >
        Find your ideal place to stay among thousands of venues, for your
        vacation, business trip, layover and exploration.
      </motion.h3>
    </>
  );
}

function GetInfoHolidaze() {
  return (
    <motion.div
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6 } }}
      className="flex gap-5 lg:gap-10 pt-5"
    >
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold ">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] smd:text-[14px] text-[10px]">
          Total Listings
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] smd:text-[14px] text-[10px]">
          Total Hosts
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] text-[10px] smd:text-[14px] ">Costumers</p>
      </div>
    </motion.div>
  );
}

function HerobannerImgContainer() {
  return (
    <>
      <div className="flex gap-5 md:pt-20 sm:-translate-y-28 translate-y-3 xxs:-translate-y-5 md:translate-y-0">
        <div className="flex flex-col gap-5 w-full md:w-1/2 items-end justify-between ">
          <motion.img
            exit={{ y: 50, transition: { duration: 0.4 } }}
            initial={{ y: 50 }}
            animate={{ y: 0, transition: { duration: 0.5 } }}
            className=" shadow-md w-full max-w-[150px] sm:max-w-[200px] object-cover h-[100px] sm:h-[150px] smd:h-[200px] rounded-[10px] "
            src="../herobannerImg3.jpg"
            alt="Image of a house"
          />
          <motion.img
            exit={{ opacity: 0, y: 50, transition: { duration: 0.4 } }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.1 },
            }}
            className=" shadow-md w-full max-w-[150px] sm:max-w-[200px] h-[100px] sm:h-[150px] object-cover rounded-[10px] "
            src="../herobannerImg.jpg"
            alt="image of a house"
          />
        </div>
        <div className="flex gap-5 w-fit md:w-1/2 justify-start ">
          <motion.img
            exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: -30,
              transition: { duration: 0.5, delay: 0.1 },
            }}
            className=" shadow-md md:w-full sm:-translate-y-20 max-w-[150px] md:max-w-[220px] h-[200px] sm:h-[250px] md:h-[340px] rounded-[10px] object-cover"
            src="../herobannerImg2.jpg"
            alt="image of a house"
          />
        </div>
      </div>
    </>
  );
}

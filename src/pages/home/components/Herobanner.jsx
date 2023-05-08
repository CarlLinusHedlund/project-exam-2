import { motion } from "framer-motion";

export default function Herobanner() {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:justify-between">
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
        className="  text-primaryDark text-[42px] sm:text-[55px] smd:text-[58px] lg:text-[75px] font-extrabold leading-[3rem] sm:leading-[4rem] md:leading-[5rem]  "
      >
        EXPLORE YOUR PLACE TO STAY
      </motion.h1>
      <motion.h3
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.6 } }}
        className=" text-primaryDark text-[16px] md:text-[20px] font-light "
      >
        Lorem ipsum dolor sit amet consectetur. Dolor dui leo placerat non
        sociis quis facilisis. Pellentesque donec scelerisque vitae sem libero
        quisque. Tellus elit amet proin in.
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
      className="flex gap-5 pt-5"
    >
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold ">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] text-[10px]">Total Listings</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] text-[10px]">Total Hosts</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className=" text-[20px] xxs:text-[25px] text-primaryDark  md:text-[30px] font-semibold">
          2k <span className="text-primaryCoral">+</span>
        </div>
        <p className="text-[#A7A7A7] text-[10px] ">Costumers</p>
      </div>
    </motion.div>
  );
}

function HerobannerImgContainer() {
  return (
    <>
      <div className="flex gap-5 md:pt-32">
        <div className="flex flex-col gap-5 w-1/2 items-end justify-between ">
          <motion.img
            exit={{ y: 50, transition: { duration: 0.4 } }}
            initial={{ y: 50 }}
            animate={{ y: 0, transition: { duration: 0.5 } }}
            className=" shadow-md w-full max-w-[200px] object-cover h-[200px] rounded-[10px] "
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
            className=" shadow-md w-[70%] md:w-full md:max-w-[200px] h-[150px] object-cover rounded-[10px] "
            src="../herobannerImg.jpg"
            alt="image of a house"
          />
        </div>
        <div className="flex gap-5 w-1/2 justify-start ">
          <motion.img
            exit={{ opacity: 0, y: -50, transition: { duration: 0.4 } }}
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: -30,
              transition: { duration: 0.5, delay: 0.1 },
            }}
            className=" shadow-md w-1/2 md:w-full -translate-y-20 max-w-[220px] h-[340px] rounded-[10px] object-cover"
            src="../herobannerImg2.jpg"
            alt="image of a house"
          />
        </div>
      </div>
    </>
  );
}

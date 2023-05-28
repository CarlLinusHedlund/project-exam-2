import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "react-router";
import ImgContainer from "./components/ImgContainer";
import { LocationSvg } from "../../components/DynamicSvgs";
import Booking from "./components/Booking";
import Tabs from "./components/Tabs";
import PropTypes from "prop-types";
import {
  useBookVenueMutation,
  useGetSingleVenueQuery,
} from "../../store/modules/ApiSlice";
import { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { UserContext } from "../../components/auth/utils/UserContext";

function BookHandler({ bookingData, bookingError }) {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (bookingData || bookingError) {
      const timeout = setTimeout(() => {
        setShowPopup(false);
      }, 4000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [bookingData, bookingError]);

  if (!showPopup) {
    return null;
  }

  if (bookingData) {
    return (
      <AnimatePresence>
        <motion.div
          animate={{
            opacity: 1,
            transition: {
              duration: 3,
            },
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="h-fit w-[250px] px-3 py-5 bg-green-400 z-50 text-[14px] fixed top-44 text-primaryDark right-5 rounded-[10px]"
        >
          Booking succeded!
        </motion.div>
      </AnimatePresence>
    );
  }

  if (bookingError) {
    return (
      <AnimatePresence>
        <motion.div
          animate={{
            opacity: 1,
            transition: {
              duration: 0.6,
            },
          }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="h-fit w-[250px] px-3 py-5 bg-red-400 z-50 text-[14px] fixed top-44 text-primaryDark right-5 rounded-[10px]"
        >
          An error occured, please try again.
        </motion.div>
      </AnimatePresence>
    );
  }
}

export default function VenueDetail() {
  const user = useContext(UserContext);

  const [bookVenue, { data: bookingData, error: bookingError }] =
    useBookVenueMutation();

  const isMobile = useMediaQuery({ query: "(max-width: 880px)" });
  const { id } = useParams();
  const { data: venue, error, isLoading } = useGetSingleVenueQuery(id);
  const [bookingOpen, setBookingOpen] = useState(false);
  const bookingRef = useRef(null);
  if (isLoading) {
    return <div className=" text-5xl ">Loading</div>;
  }

  console.log("bookingData", bookingData);
  console.log("bookingError", bookingError);

  if (error) {
    <div>An error occured: {error}</div>;
  }
  console.log(venue);
  if (venue) {
    return (
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="inner px-2 md:px-4 h-full font-poppins relative "
      >
        <BookHandler bookingError={bookingError} bookingData={bookingData} />
        {bookingOpen && isMobile && (
          <div
            onClick={() => setBookingOpen(false)}
            ref={bookingRef}
            className="absolute top-0 left-0 bottom-0 right-0 bg-[#00000039] h-full w-screen z-30"
          ></div>
        )}
        <ImgContainer title={venue[0].title} media={venue[0].media} />
        <div className="grid grid-cols-1 smd:grid-cols-7 md:grid-rows-3 md:h-[500px] gap-8 pt-5 ">
          <div className="col-span-1 w-full md:cols-span-5 md:row-span-3 md:row-start-1 md:col-start-1 md:col-end-5 bg-primaryWhite ">
            <div className="flex flex-col">
              <h2 className="text-[20px] md:text-[24px] smd:text-[30px] font-bold">
                {venue[0].title.substring(0, 75)}
              </h2>
              <div className="flex gap-1 items-center">
                <LocationSvg color={"#E0736D"} width={"18px"} height={"18px"} />
                <p className="">
                  {venue[0].location.address.city},{" "}
                  {venue[0].location.address.country}
                </p>
              </div>
            </div>
            {venue[0].description && (
              <div className="pb-10 pt-4">
                {venue[0].description.substring(0, 100)}
              </div>
            )}
            <Tabs
              venueImg={venue[0].media[0]}
              location={venue[0].location}
              owner={venue[0].owner_id}
              meta={venue[0].meta}
            />
          </div>
          <Booking
            id={venue[0].id}
            price={venue[0].price_per_night}
            bookings={venue[0].bookings}
            maxGuests={venue[0].max_guest}
            meta={venue[0].meta}
            bookingOpen={bookingOpen}
            setBookingOpen={setBookingOpen}
            isMobile={isMobile}
            bookVenue={bookVenue}
            user={user.session.user}
          />
        </div>
      </motion.div>
    );
  }
}

BookHandler.propTypes = {
  bookingData: PropTypes.object,
  bookingError: PropTypes.object,
};

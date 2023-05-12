import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../../Supabase";
import ImgContainer from "./components/ImgContainer";
import { LocationSvg } from "../../components/DynamicSvgs";
import Booking from "./components/Booking";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log(id);
  useEffect(() => {
    async function fetchVenue() {
      try {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
          setIsLoading(true);
          return;
        }

        setVenue(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVenue();
  }, [id]);

  if (isLoading) {
    return <div className=" text-5xl ">Loading</div>;
  }

  if (venue) {
    return (
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="inner px-2 md:px-4 h-screen "
      >
        <ImgContainer title={venue.title} media={venue.media} />
        <div className="grid grid-cols-1 md:grid-cols-7 md:grid-rows-3 md:h-[500px] gap-3 pt-5 ">
          <div className="pl-2 col-span-1 w-full md:cols-span-5 md:row-span-3 md:row-start-1 md:col-start-1 md:col-end-5 bg-primaryWhite">
            <div className="">
              <h2 className="text-[20px] md:text-[24px] font-semibold">
                {venue.title}
              </h2>
            </div>
            <div className="flex gap-1 items-center">
              <LocationSvg color={"#E0736D"} width={"18px"} height={"18px"} />
              <p className="">
                {venue.location.address.city}, {venue.location.address.country}
              </p>
            </div>
          </div>
          <Booking
            price={venue.price_per_night}
            bookings={venue.bookings}
            maxGuests={venue.max_guest}
            meta={venue.meta}
          />
        </div>
      </motion.div>
    );
  }
}

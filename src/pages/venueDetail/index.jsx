import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../../Supabase";
import ImgContainer from "./components/ImgContainer";
import { LocationSvg } from "../../components/DynamicSvgs";

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
        className="inner px-2 md:px-4 "
      >
        <ImgContainer title={venue.title} media={venue.media} />
        <div className="">
          <h2 className="text-">{venue.title}</h2>
          <div className="flex gap-2 items-center">
            <LocationSvg color={"#E0736D"} width={"18px"} height={"18px"} />
            <p className="">
              {venue.location.address.city}, {venue.location.address.country}
            </p>
          </div>
        </div>
      </motion.div>
    );
  }
}

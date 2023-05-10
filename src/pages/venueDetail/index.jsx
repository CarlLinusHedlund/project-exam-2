import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../../Supabase";
import ImgContainer from "./components/ImgContainer";

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
        className="inner "
      >
        {venue.title}
        <ImgContainer
          title={venue.title}
          media={[
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          ]}
        />
      </motion.div>
    );
  }
}

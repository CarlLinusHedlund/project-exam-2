import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { VenueCard } from "./VenueCard";
import { supabase } from "../../utils/Supabase";

export function Venues() {
  const [loading, setLoading] = useState(true);
  const [venues, setVenues] = useState([]);
  console.log(venues);
  useEffect(() => {
    getVenues();
  }, []);

  async function getVenues() {
    let { data: venues, error } = await supabase.from("venues").select("*");
    if (venues) {
      setLoading(false);
      console.log(venues);
      setVenues(venues);
    }

    if (error) {
      setLoading(true);
      console.log(error);
    }
  }
  return (
    <motion.div
      className="inner px-4"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-6 items-center sm:justify-center py-20">
        {venues &&
          venues.map((venue) => (
            <VenueCard
              media={venue.media}
              id={venue.id}
              key={venue.id}
              title={venue.title}
              country={venue.location.address.country}
              city={venue.location.address.city}
              price={venue.price_per_night}
            />
          ))}
      </div>
      {loading && <h1>Loading....</h1>}
    </motion.div>
  );
}

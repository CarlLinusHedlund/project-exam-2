import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../../Supabase";
import { Link } from "react-router-dom";

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
      className="inner"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-10 items-center sm:justify-center py-20">
        {venues &&
          venues.map((venue) => (
            <Link
              className="p-[5px] w-full h-[300px] max-w-[315px] max-h-[290px] rounded-[10px] border-[1px] border-gray-300"
              to={`/venue/id=${venue.id}`}
              key={venue.id}
            >
              <div className="w-full h-[65%] bg-red-300 rounded-[10px]">
                <img
                  className=" rounded-[10px] w-full h-full object-cover"
                  src={`${venue.media[0]}`}
                  alt={venue.title}
                />
              </div>
            </Link>
          ))}
      </div>
      {loading && <h1>Loading....</h1>}
    </motion.div>
  );
}

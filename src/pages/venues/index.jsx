import { motion } from "framer-motion";
import { VenueCard } from "./VenueCard";
import { useGetVenuesQuery } from "../../store/modules/ApiSlice";
import { useParams } from "react-router-dom";

export function Venues() {
  const { country, city } = useParams();
  console.log(country, city);

  const { data: venues, error, isLoading } = useGetVenuesQuery({});

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
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
      {/* {loading && <h1>Loading....</h1>} */}
    </motion.div>
  );
}

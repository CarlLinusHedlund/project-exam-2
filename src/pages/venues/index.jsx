import { motion } from "framer-motion";
import { VenueCard } from "./components/VenueCard";
import { useGetAllVenuesQuery } from "../../store/modules/ApiSlice";
import { useParams } from "react-router-dom";
import Filter from "./components/Filter";
import Map from "./components/Map";
import { useEffect, useState } from "react";

export function Venues() {
  const { country, city } = useParams();
  console.log(country, city);
  const [searchQuery, setSearchQuery] = useState([]);
  const [venues, setVenues] = useState([]);
  const { data: venueData, error, isLoading } = useGetAllVenuesQuery();

  useEffect(() => {
    if (venueData) {
      setVenues(venueData);
    }
  }, [venueData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <motion.div
      className="inner px-4 pt-10 flex flex-col smd:flex-row h-full gap-10 smd:gap-20"
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
    >
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-col w-full gap-10">
        <Map
          setVenues={setVenues}
          venues={venues}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
      </div>
    </motion.div>
  );
}

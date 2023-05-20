import { motion } from "framer-motion";
import { useParams } from "react-router";
import ImgContainer from "./components/ImgContainer";
import { LocationSvg } from "../../components/DynamicSvgs";
import Booking from "./components/Booking";
import Tabs from "./components/Tabs";
import { useGetSingleVenueQuery } from "../../store/modules/ApiSlice";

export default function VenueDetail() {
  const { id } = useParams();
  const { data: venue, error, isLoading } = useGetSingleVenueQuery(id);

  if (isLoading) {
    return <div className=" text-5xl ">Loading</div>;
  }

  if (error) {
    <div>An error occured: {error}</div>;
  }

  if (venue) {
    return (
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="inner px-2 md:px-4 h-screen font-poppins "
      >
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
            <Tabs owner={venue[0].owner_id} meta={venue[0].meta} />
          </div>
          <Booking
            price={venue[0].price_per_night}
            bookings={venue[0].bookings}
            maxGuests={venue[0].max_guest}
            meta={venue[0].meta}
          />
        </div>
      </motion.div>
    );
  }
}

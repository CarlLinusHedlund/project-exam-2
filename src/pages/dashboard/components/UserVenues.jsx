import { AnimatePresence, motion } from "framer-motion";
import {
  useDeleteVenueMutation,
  useGetVenuesQuery,
} from "../../../store/modules/ApiSlice";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DeleteSvg, EditSvg } from "../../../components/DynamicSvgs";
import { useMediaQuery } from "react-responsive";
import { supabase } from "../../../utils/Supabase";

export default function UserVenues({ owner_id }) {
  const [modalVisibility, setModalVisibility] = useState([]);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [deleteObject, setDeleteObject] = useState({
    id: "",
    name: "",
  });
  console.log(deleteObject);
  const { data, isLoading, error } = useGetVenuesQuery(owner_id);
  const [deleteVenue] = useDeleteVenueMutation();
  useEffect(() => {
    if (data) {
      setModalVisibility(Array(data.length).fill(false));
    }
  }, [data]);

  const onClick = (index) => {
    setModalVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = !newVisibility[index];
      return newVisibility;
    });
  };

  const handleDeleteVenue = async (venue) => {
    console.log("fireee");
    console.log(venue);
    deleteVenue(venue);
  };

  if (isLoading)
    return (
      <div className="pt-20 animate-pulse w-full text-center">Loading...</div>
    );

  if (error) return <div>{error.message}</div>;
  return (
    <div className="flex w-full flex-col pt-14 gap-6">
      <h1 className="text-xl font-bold">Total Venues({data?.length})</h1>

      {data && data.length > 0 ? (
        <table className=" font-poppins w-full">
          <thead>
            <tr className="text-left">
              <th className=" text-sm font-semibold text-primaryDark"></th>
              <th className=" text-sm font-semibold text-primaryDark">
                Venue Title
              </th>
              <th className=" text-sm font-semibold text-primaryDark">
                Created
              </th>
              {!isMobile && (
                <th className=" text-sm font-semibold text-primaryDark">
                  Price<span className="text-[10px] text-gray-300">/night</span>
                </th>
              )}
              <th className=" text-sm font-semibold text-primaryDark">
                Bookings
              </th>
              <th className=" text-sm font-semibold text-primaryDark">Edit</th>
              <th className="text-sm font-semibold text-primaryDark">Delete</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {data.map((venue, index) => {
                const created_at = format(
                  new Date(venue.created_at),
                  "dd.MM.yyyy HH:mm"
                );
                return (
                  <motion.tr
                    animate={{
                      opacity: 1,
                      transition: {
                        delay: 0.11 * index,
                        duration: 0.08 * index,
                      },
                    }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    key={venue.id}
                    className=" hover:bg-gray-100 min-w-[600px] w-full overflow-x-scroll rounded-md border-[#E2E8F0] lg:hover:shadow-lg lg:hover:scale-[1.02] duration-500"
                  >
                    <td className="py-4"></td>

                    <td className="text-ellipsis duration-300 text-primaryDark py-4 text-[12px] md:text-[14px]">
                      <Link className="" to={`/venue/${venue.id}`}>
                        {venue.title}
                      </Link>
                    </td>

                    <td className="py-4 text-gray-400 text-[10px] md:text-[14px]">
                      {created_at}
                    </td>
                    {!isMobile && (
                      <td className="py-4 text-gray-400  text-[14px]">
                        {venue.price_per_night} NOK
                      </td>
                    )}

                    <td className="py-4 text-gray-400 text-center sm:text-left text-[14px]">
                      {venue.bookings.length}
                    </td>
                    <td className="py-4">
                      <div className="w-fit h-fit cursor-pointer hover:scale-125 duration-300 hover:rotate-12">
                        <Link to={`/dashboard/edit/${venue.id}`}>
                          <EditSvg
                            color="#252525"
                            height={`${isMobile ? "12px" : "15px"}`}
                            width={`${isMobile ? "12px" : "15px"}`}
                          />
                        </Link>
                      </div>
                    </td>
                    <td className="py-4">
                      <div
                        onClick={() => {
                          setDeleteObject(venue);
                          onClick(index); // Toggle modal visibility if needed
                        }}
                        className="flex pl-3 items-center relative w-full h-[20px] cursor-pointer hover:scale-125 group duration-300"
                      >
                        {!modalVisibility[index] && (
                          <DeleteSvg
                            color="#252525"
                            height={`${isMobile ? "12px" : "15px"}`}
                            width={`${isMobile ? "12px" : "15px"}`}
                          />
                        )}
                        {modalVisibility[index] && (
                          <div
                            onClick={() => {
                              handleDeleteVenue(venue.id);
                              // Invoke deleteVenue inside the callback
                              onClick(index);
                              // setDeleteObject("");
                            }}
                            onMouseLeave={() => {
                              onClick(index);
                              setDeleteObject("");
                            }}
                            className={`absolute top-0 left-0 text-[12px] text-primaryCoral rounded-[10px] `}
                          >
                            Confirm
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl text-gray-600">
            Oh no! You have no venues yet...
          </h1>
          <Link
            to="/dashboard/publish"
            className={
              "relative flex w-fit min-w-[250px] items-center justify-center rounded-[10px] bg-primaryCoral p-4 font-medium lg:hover:text-primaryWhite text-primaryDark duration-300 lg:hover:bg-primaryDark"
            }
          >
            List A Vanue
          </Link>
        </div>
      )}
    </div>
  );
}

UserVenues.propTypes = {
  owner_id: PropTypes.string.isRequired,
};

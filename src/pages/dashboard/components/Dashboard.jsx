import { motion } from "framer-motion";
import PropTypes from "prop-types";

// import { useContext, useEffect, useState } from "react";
// import {
//   useGetUserQuery,
//   useGetVenuesQuery,
// } from "../../../store/modules/ApiSlice";

export default function Dashboard({ session }) {
  console.log(session);
  // const { data: userData, error: userError } = useGetUserQuery(session.user);
  // const [user, setUser] = useState(session.user.id);
  // useEffect(() => {
  //   setUser(session.user.id);
  // }, [session]);
  // console.log("userData", userData);
  // console.log("userError", userError);
  // console.log(session);
  // const { data, isLoading, error } = useGetVenuesQuery("getUserVenues", user);

  // console.log("data", data);
  // console.log("isLoading", isLoading);
  // console.log("error", error);
  // if (session.user) {
  //   const user = session.user;
  //   getUserVenues({
  //     type: "getUserVenues",
  //     user_id: user.id,
  //   }).then((response) => {
  //     console.log(response.data);
  //     console.log("isLoading", isLoading);
  //     console.log("error", error);
  //   });
  // }

  return (
    <motion.div
      className="w-full h-full py-14 px-20"
      exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
    >
      {/* {userData && (
        <div className="w-full">
          {userData[0].profile_img ? (
            <img
              className="h-20 w-20 rounded-3xl object-cover"
              src={userData[0].profile_img}
              alt={userData[0].name}
            />
          ) : (
            <div className="p-10 bg-primaryCoral flex justify-center items-center">
              {userData[0]}
            </div>
          )}
        </div>
      )} */}
    </motion.div>
  );
}

Dashboard.propTypes = {
  session: PropTypes.object,
};

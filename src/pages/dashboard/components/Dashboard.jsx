import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../components/auth/utils/UserContext";
import {
  useGetUserQuery,
  useGetVenuesQuery,
  useGetTodaysChekinChekoutQuery,
} from "../../../store/modules/ApiSlice";
import { useMediaQuery } from "react-responsive";
import DashboardTabs from "./DashboardTabs";

export function TodaysBookingsData({
  owner_id,
  checkIns,
  checkOuts,
  totalBookings,
}) {
  const { data, isLoading, error } = useGetTodaysChekinChekoutQuery(owner_id);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  // console.log("wner_id: ", owner_id);
  console.log("isMobile: ", isMobile);
  if (error) {
    console.log(error);
  }
  if (isLoading) return <div>Loading....</div>;

  if (totalBookings) {
    return data.length;
  }

  if (checkIns) {
    const NumberOfCheckIns = data.reduce((acc, curr) => {
      if (curr.check_in) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return NumberOfCheckIns.length;
  }

  if (checkOuts) {
    const NumberOfCheckOuts = data.reduce((acc, curr) => {
      if (curr.check_out) {
        acc.push(curr);
      }
      return acc;
    }, []);
    return NumberOfCheckOuts.length;
  }
}
TodaysBookingsData.propTypes = {
  owner_id: PropTypes.string,
  totalBookings: PropTypes.bool,
  checkOuts: PropTypes.bool,
  checkIns: PropTypes.bool,
};

export default function Dashboard() {
  const { session } = useContext(UserContext);
  const id = session.user;
  const [user, setUser] = useState(null);
  const { data: userData, isLoading, error } = useGetUserQuery(id.id);
  useEffect(() => {
    if (userData && userData.length > 0) {
      const data = userData[0];
      setUser(data);
    }
  }, [userData]);
  console.log("user", user);

  if (error) {
    console.log(error);
    return (
      <div className="fixed w-72 rounded-sm h-10 bg-red-400 top-20 right-10 ">
        {error.message}
      </div>
    );
  }

  if (isLoading) return <div>Loading...</div>;

  if (user) {
    console.log("userData", userData);
    return (
      <motion.div
        className=" text-primaryDark font-poppins w-full h-full py-14 px-5 md:px-10 lg:px-20 "
        exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        {user && (
          <div className="w-full flex gap-4">
            {user.profile_img ? (
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={user.profile_img}
                alt={user.name}
              />
            ) : (
              <div className="p-10 h-20 w-20 rounded-full bg-primaryCoral flex justify-center items-center uppercase font-semibold text-[28px]">
                {user.name[0]}
              </div>
            )}
            <div className="flex flex-col items-start">
              <motion.p
                exit={{ opacity: 0, x: 10, transition: { duration: 0.3 } }}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
                className="text-[25px] font-semibold "
              >
                Good day, <span className="capitalize ">{user.name}</span>
              </motion.p>
              <p className="text-[14px] text-gray-400  ">{user.email}</p>
            </div>
          </div>
        )}
        <div className="pt-10 flex flex-col gap-2  ">
          <div className="text-[18px] font-semibold ">
            What’s happening today?
          </div>
          <div className="w-full flex gap-5 items-center justify-start ">
            <div className="w-1/3 shadow-md hover:shadow-lg group flex flex-col justify-between bg-gray-100 h-[130px] rounded-[10px] p-3 lg:p-5 ">
              <div className="flex gap-2 items-center">
                <motion.img
                  className="h-4 w-4 md:h-6 md:w-6"
                  whileHover={{
                    rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                    transition: { duration: 0.8 },
                  }}
                  src="../calendar.svg"
                  alt="key icon"
                />
                <p className="text-[14px] xl:text-[16px] font-medium ">
                  Total bookings
                </p>
              </div>
              <div className=" font-semibold text-[30px]">
                <TodaysBookingsData owner_id={user.id} totalBookings={true} />
              </div>
            </div>
            <div className="w-1/3 shadow-md hover:shadow-lg group flex flex-col justify-between bg-gray-100 h-[130px] rounded-[10px] p-3 lg:p-5">
              <div className="flex gap-2 items-center">
                <motion.img
                  className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6"
                  whileHover={{
                    rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                    transition: { duration: 0.8 },
                  }}
                  src="../key.svg"
                  alt="key icon"
                />
                <p className="text-[14px] xl:text-[16px] font-medium ">
                  Check inns
                </p>
              </div>
              <div className=" font-semibold text-[30px]">
                <TodaysBookingsData owner_id={user.id} checkIns={true} />
              </div>
            </div>
            <div className="w-1/3 shadow-md hover:shadow-lg group flex flex-col justify-between bg-gray-100 h-[130px] rounded-[10px] p-3 lg:p-5 ">
              <div className="flex gap-2 items-center">
                <motion.img
                  className="h-4 w-4 md:h-6 md:w-6"
                  whileHover={{
                    rotate: [0, 20, -20, 20, -20, 20, -20, 0],
                    transition: { duration: 0.8 },
                  }}
                  src="../handWaving.svg"
                  alt="key icon"
                />
                <p className="text-[14px] xl:text-[16px] font-medium ">
                  Checkouts
                </p>
              </div>
              <div className=" font-semibold text-[30px]">
                <TodaysBookingsData owner_id={user.id} checkOuts={true} />
              </div>
            </div>
          </div>
        </div>
        <DashboardTabs owner_id={user.id} />
      </motion.div>
    );
  }
}

Dashboard.propTypes = {
  session: PropTypes.object,
};

import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { supabase } from "../../../utils/Supabase";

export default function DesktopNav({ user }) {
  const [isHost, setIsHost] = useState(false);

  async function getUser(id) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    console.log(data);
    if (data) {
      setIsHost(data[0].is_host);
    }
  }

  useEffect(() => {
    if (user.session) {
      console.log(user.session);
      getUser(user.session.user.id);
    }
  }, [user]);
  return (
    <nav className="flex gap-5 font-poppins text-[12px] lg:text-[14px]">
      <NavLink activeclassname="active" className="duration-300" to={"/"}>
        Home
      </NavLink>
      <NavLink
        activeclassname="active"
        className="duration-300 "
        to={"/venues"}
      >
        Place to stay?
      </NavLink>
      {!isHost && (
        <NavLink
          activeclassname="active"
          className="duration-300"
          to={"dashboard/become-a-host"}
        >
          Become a host
        </NavLink>
      )}

      <NavLink
        end
        activeclassname="active"
        className="duration-300"
        to={"/dashboard"}
      >
        Dashboard
      </NavLink>
    </nav>
  );
}

DesktopNav.propTypes = {
  user: PropTypes.object,
};

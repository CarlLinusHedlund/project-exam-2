import PropTypes from "prop-types";
// import { useState } from "react";
// import { useEffect } from "react";
// import { supabase } from "../../../utils/Supabase";

export default function YourHostTab({ host }) {
  console.log("host from yourhosttab: ", host);

  return (
    <div>
      {host && (
        <div>
          {host.name} && {host.about_me}
        </div>
      )}
    </div>
  );
}

YourHostTab.propTypes = {
  host: PropTypes.array.isRequired,
};

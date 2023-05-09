import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { supabase } from "../../Supabase";

export default function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  console.log(id);
  useEffect(() => {
    async function fetchVenue() {
      try {
        const { data, error } = await supabase
          .from("venues")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
          return;
        }

        setVenue(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchVenue();
  }, [id]);

  return <div>{venue.title}</div>;
}

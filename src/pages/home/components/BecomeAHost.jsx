import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../components/auth/utils/UserContext";
import { supabase } from "../../../utils/Supabase";

export default function BecomeAHost() {
  const session = useContext(UserContext);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", session.session.user.email);
      if (error) {
        console.log(error);
      }
      if (data) {
        setIsHost(data[0].is_host);
      }
    };
    if (session.session) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{isHost ? <div>some fuck here</div> : <BecomeHostBanner />}</>;
}

function BecomeHostBanner() {
  return (
    <div className="w-full h-fit">
      <div></div>
      <img
        className="w-full h-full "
        src="../becomeHost.png"
        alt="img of a person looking out of window"
      />
    </div>
  );
}

import { useContext, useState } from "react";
import { UserContext } from "../../../components/auth/utils/UserContext";
import { supabase } from "../../../Supabase";

export default function BecomeAHost() {
  const session = useContext(UserContext);
  const [isHost, setIsHost] = useState(false);
  const fetchData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", session.session.user.email);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setIsHost(data[0].is_host);
    }
  };
  if (session.session) {
    fetchData();
  }

  return <>{isHost ? <div>some fucxk here</div> : <BecomeHostBanner />}</>;
}

function BecomeHostBanner() {
  return (
    <div className="w-full">
      <img src="becomeHost.png" alt="img of a person looking out of window" />
    </div>
  );
}

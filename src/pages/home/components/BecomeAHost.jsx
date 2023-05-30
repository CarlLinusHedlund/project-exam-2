import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../components/auth/utils/UserContext";
import { supabase } from "../../../utils/Supabase";
import { SignInContext } from "../../../components/auth/utils/AuthContext";

export default function BecomeAHost() {
  const [signInModal, setSignInModal] = useContext(SignInContext);
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

  // if (isHost) {
  //   null;
  // }

  const checkSession = () => {
    if (session.session) {
      location.pathname = "/dashboard";
    } else {
      setSignInModal(!signInModal);
    }
  };

  if (!isHost) {
    return <BecomeHostBanner />;
  }

  function BecomeHostBanner() {
    return (
      <div className="relative w-full min-h-[400px] h-full rounded-[10px] overflow-hidden ">
        <div className=" top-0 left-0 right-0 bottom-0 rounded-[20px] absolute w-full h-full z-10 bg-[#00000023]"></div>
        <img
          className=" absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover rounded-[10px] "
          src="../becomeHost.png"
          alt="img of a person looking out of window"
        />
        <div className=" absolute flex flex-col z-20 top-20 left-5 md:left-10 text-primaryWhite ">
          <h3 className="text-[25px] leading-9 md:leading-[3rem] md:font-semibold md:text-[40px] font-bold ">
            YOUR WORLD IS <br /> WORTH SHARING
          </h3>
          <p className=" text-[12px] md:text-[16px] font-light ">
            Turn your extra space into your <br /> next oppurtunity
          </p>
          <div
            onClick={checkSession}
            className=" flex font-medium text-primaryDark justify-center items-center cursor-pointer mt-10 h-10 w-52 bg-primaryWhite rounded-[10px] "
          >
            Become a host
          </div>
        </div>
      </div>
    );
  }
}

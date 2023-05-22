import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./index.css";
import { UserContext } from "./components/auth/utils/UserContext";
import { supabase } from "./utils/Supabase";
import SignInModal from "./components/auth/SignIn";
import SignUpModal from "./components/auth/SignUp";
import {
  SignInContext,
  SignUpContext,
} from "./components/auth/utils/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "./store/modules/ProfileSlice";

function App() {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  if (signInModalOpen || signUpModalOpen) {
    document.body.classList.add("disableScroll");
  } else {
    document.body.classList.remove("disableScroll");
  }
  const [session, setSession] = useState(null);

  async function getProfile(id) {
    return id;
  }

  if (session && !profileData) {
    const id = session.user.id;
    getProfile(id);
    dispatch(setProfile(id));
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <SignInContext.Provider value={[signInModalOpen, setSignInModalOpen]}>
        <SignUpContext.Provider value={[signUpModalOpen, setSignUpModalOpen]}>
          <Layout />2{signInModalOpen && <SignInModal />}
          {signUpModalOpen && <SignUpModal />}
        </SignUpContext.Provider>
      </SignInContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

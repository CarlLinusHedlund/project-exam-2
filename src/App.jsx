import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./index.css";
import { UserContext } from "./components/auth/utils/UserContext";
import { supabase } from "./utils/Supabase";
import { Provider } from "react-redux";
import { store } from "./store/store";
import SignInModal from "./components/auth/SignIn";
import SignUpModal from "./components/auth/SignUp";
import {
  SignInContext,
  SignUpContext,
} from "./components/auth/utils/AuthContext";
// import SignInModal from "../auth/SignIn";
// import SignUpModal from "../auth/SignUp";

function App() {
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  if (signInModalOpen || signUpModalOpen) {
    document.body.classList.add("disableScroll");
  } else {
    document.body.classList.remove("disableScroll");
  }
  const [session, setSession] = useState(null);

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

  console.log("Session: ", session);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <Provider store={store}>
        <SignInContext.Provider value={[signInModalOpen, setSignInModalOpen]}>
          <SignUpContext.Provider value={[signUpModalOpen, setSignUpModalOpen]}>
            <Layout />;{signInModalOpen && <SignInModal />}
            {signUpModalOpen && <SignUpModal />}
          </SignUpContext.Provider>
        </SignInContext.Provider>
      </Provider>
    </UserContext.Provider>
  );
}

export default App;

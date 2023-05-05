import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./index.css";
import { supabase } from "./supabase";
import { UserContext } from "./components/auth/utils/UserContext";

function App() {
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

  console.log(session);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <Layout />;
    </UserContext.Provider>
  );
}

export default App;

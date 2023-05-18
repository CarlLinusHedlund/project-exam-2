import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import "./index.css";
import { UserContext } from "./components/auth/utils/UserContext";
import { supabase } from "./utils/Supabase";
import { client } from "./utils/PexelsClient";

function App() {
  const [session, setSession] = useState(null);
  const query = "Nature";
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

  client.photos.search({ query, per_page: 1 }).then((photos) => {
    console.log("pexels: ", photos);
  });

  console.log(session);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      <Layout />;
    </UserContext.Provider>
  );
}

export default App;

import { useContext } from "react";
import { UserContext } from "../../components/auth/utils/UserContext";
import Dashboard from "./components/Dashboard";

export default function Index() {
  const session = useContext(UserContext);
  return (
    <div className="flex relative gap-5 ">
      <Dashboard session={session} />
    </div>
  );
}

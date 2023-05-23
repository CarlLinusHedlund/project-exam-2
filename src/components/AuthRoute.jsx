import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "./auth/utils/UserContext";

const AuthRoute = () => {
  const { session } = useContext(UserContext);
  return session ? (
    <Outlet />
  ) : (
    <Navigate to={"/signIn"} replace state={{ path: location.pathname }} />
  );
};

export default AuthRoute;

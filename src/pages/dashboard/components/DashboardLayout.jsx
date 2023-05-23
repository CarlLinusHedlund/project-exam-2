import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function DashboardLayout() {
  return (
    <div className="inner flex ">
      <Nav />
      <Outlet />
    </div>
  );
}

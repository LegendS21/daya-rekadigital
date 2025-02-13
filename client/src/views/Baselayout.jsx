import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";

export default function Baselayout({ url }) {
  return (
    <>
      <Sidebar url={url} />
      <Outlet />
    </>
  );
}

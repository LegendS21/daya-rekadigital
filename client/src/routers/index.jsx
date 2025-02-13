import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Customer from "../views/Customer";
import Baselayout from "../views/Baselayout";
import CustomerDetail from "../views/customerDetail";
const url = `http://localhost:3000`;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Baselayout url={url} />,
  },
  {
    path: "/customer/:id",
    element: <CustomerDetail url={url} />,
  },
]);
export default router;

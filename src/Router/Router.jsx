import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch('http://localhost:3000/latest-products'),
      },
      {
        path: 'allProducts',
        Component: AllProducts,
      },
      {
        path: 'registration',
        Component: Registration,
      },
      {
        path: 'login',
        Component: Login,
      },
    ]
  },
]);
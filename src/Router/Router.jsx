import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute"

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
        loader: () => fetch('http://localhost:3000/products'),
      },
      {
        path: 'product/:id',
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        )
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
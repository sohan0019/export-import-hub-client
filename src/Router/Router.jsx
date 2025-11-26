import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home";
import AllProducts from "../Pages/AllProducts/AllProducts";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import PrivateRoute from "../PrivateRoute/PrivateRoute"
import MyImports from "../Pages/MyImports/MyImports";
import AddProduct from "../Pages/AddProduct/AddProduct";
import MyExports from "../Pages/MyExports/MyExports";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
        loader: () => fetch('https://import-export-hub-server-three.vercel.app/latest-products'),
      },
      {
        path: 'allProducts',
        Component: AllProducts,
        loader: () => fetch('https://import-export-hub-server-three.vercel.app/products'),
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
        path: 'myImports',
        element: (
          <PrivateRoute>
            <MyImports></MyImports>
          </PrivateRoute>
        )
      },
      {
        path: 'myExports',
        element: (
          <PrivateRoute>
            <MyExports></MyExports>
          </PrivateRoute>
        )
      },
      {
        path: 'addProduct',
        element: (
          <PrivateRoute>
            <AddProduct></AddProduct>
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
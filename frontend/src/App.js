
import React from 'react'
import { Children } from "react";
import { createBrowserRouter,BrowserRouter as Router,Route, RouterProvider, Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import Product from "./pages/Product/Product.jsx";
import Products from "./pages/Products/Products.jsx";
import "./app.scss"
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx"
import Order from "./pages/Order/Order.jsx"
import Shipping from './pages/Shipping/Shipping.jsx';
//import { Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/:category",
        element: <Products />,
      },
      {
        path: "/product/:product_id",
        element: <Product />,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path:"/shippingDetails",
        element:<Shipping/>
      },
      {
        path:"/placeOrder",
        element:<PlaceOrder/>
      },
      {
        path:"/order/:order_id",
        element:<Order/>
      }

    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}



export default App;

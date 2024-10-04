import App from "@/App";
import AboutUs from "@/page/AboutUs/AboutUs";
import SignIn from "@/page/Authentication/SignIn";
import SignUp from "@/page/Authentication/SignUp";
import Cart from "@/page/Cart/Cart";
import Checkout from "@/page/Checkout/Checkout";
import CustomerManagement from "@/page/Dashboard/CustomerManagement/CustomerManagement";
import Dashboard from "@/page/Dashboard/Dashboard";
import OrderManagement from "@/page/Dashboard/OrderManagement/OrderManagement";
import Overview from "@/page/Dashboard/Overview/Overview";
import ProductManagement from "@/page/Dashboard/ProductManagement/ProductManagement";
import Home from "@/page/Home/Home";
import ProductDetails from "@/page/ProductDetails/ProductDetails";
import Products from "@/page/Products/Products";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/about-us',
                element: <AboutUs />

            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/product-details',
                element: <ProductDetails />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/checkout',
                element: <Checkout />
            }
        ]
    },
    {
        path: "/auth",
        children: [
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "signin",
                element: <SignIn />,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
            {
                path: "",
                element: <Overview />
            },
            {
                path: "order-management",
                element: <OrderManagement />
            },
            {
                path: "product-management",
                element: <ProductManagement />
            },
            {
                path: "customer-management",
                element: <CustomerManagement />
            }
        ]
    }
])
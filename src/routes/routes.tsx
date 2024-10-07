import App from "@/App";
import AboutUs from "@/page/AboutUs/AboutUs";
import SignIn from "@/page/Authentication/SignIn";
import SignUp from "@/page/Authentication/SignUp";
import Cart from "@/page/Cart/Cart";
import Checkout from "@/page/Checkout/Checkout";
import Success from "@/page/Checkout/Success";
import CustomerManagement from "@/page/Dashboard/CustomerManagement/CustomerManagement";
import Dashboard from "@/page/Dashboard/Dashboard";
import OrderManagement from "@/page/Dashboard/OrderManagement/OrderManagement";
import Overview from "@/page/Dashboard/Overview/Overview";
import ProductManagement from "@/page/Dashboard/ProductManagement/ProductManagement";
import Home from "@/page/Home/Home";
import ProductDetails from "@/page/ProductDetails/ProductDetails";
import Products from "@/page/Products/Products";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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
                path: '/products/:id',
                element: <ProductDetails />
            },
            {
                path: '/cart',
                element: <ProtectedRoute accessLevel="both"><Cart /></ProtectedRoute>
            },
            {
                path: '/checkout',
                element: <ProtectedRoute accessLevel="both"><Checkout /></ProtectedRoute>
            },
            {
                path: '/success',
                element: <ProtectedRoute accessLevel="both"><Success /></ProtectedRoute>
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
        element: <ProtectedRoute accessLevel="admin"><Dashboard /></ProtectedRoute>,
        children: [
            {
                path: "",
                element: <ProtectedRoute accessLevel="admin"><Overview /></ProtectedRoute>
            },
            {
                path: "order-management",
                element: <ProtectedRoute accessLevel="admin"><OrderManagement /></ProtectedRoute>
            },
            {
                path: "product-management",
                element: <ProtectedRoute accessLevel="admin"><ProductManagement /></ProtectedRoute>
            },
            {
                path: "customer-management",
                element: <ProtectedRoute accessLevel="admin"><CustomerManagement /></ProtectedRoute>
            }
        ]
    }
])
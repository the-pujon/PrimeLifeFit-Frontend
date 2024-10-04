import App from "@/App";
import AboutUs from "@/page/AboutUs/AboutUs";
import SignIn from "@/page/Authentication/SignIn";
import SignUp from "@/page/Authentication/SignUp";
import Cart from "@/page/Cart/Cart";
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
    }
])
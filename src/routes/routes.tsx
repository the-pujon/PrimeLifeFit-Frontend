import App from "@/App";
import AboutUs from "@/page/AboutUs/AboutUs";
import SignIn from "@/page/Authentication/SignIn";
import SignUp from "@/page/Authentication/SignUp";
import Home from "@/page/Home/Home";
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
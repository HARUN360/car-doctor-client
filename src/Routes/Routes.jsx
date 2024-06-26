import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/SignUp";
import Bookservice from "../pages/Bookservice/Bookservice";
import Bookings from "../pages/Home/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }, 
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/book/:id',
                element: <PrivateRoute><Bookservice></Bookservice></PrivateRoute>,
                loader: ({params}) => fetch(`https://car-doctor-server-gamma-teal.vercel.app/services/${params.id}`)
            },
            {
                path: '/booking',
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>,

            },
        ]
    },
]);

export default router;
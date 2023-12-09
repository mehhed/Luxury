import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";

import Details from "./Components/Details.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Authentication from "./Authentication/Authentication.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AllProperties from "./pages/AllProperties.jsx";
import { HelmetProvider } from "react-helmet-async";
import Dashboard from "./pages/Dashboard.jsx";
import PrivatRout from "./route/PrivatRout.jsx";

// user related
import UserHome from "./userCmponents/UserHome.jsx";
import Myreviews from "./userCmponents/Myreviews.jsx";
import Propertybought from "./userCmponents/Propertybought.jsx";
import Wishlist from "./userCmponents/Wishlist.jsx";

//  agent relted
import AgentProfile from "./AgentComponent/AgentProfile.jsx";
import MyAddedProperties from "./AgentComponent/myAddedProperties.jsx";
import MySoldProperties from "./AgentComponent/mySoldProperties.jsx";
import RequestedProperties from "./AgentComponent/RequestedProperties.jsx";
import AddedNewItems from "./AgentComponent/AddedNewItems.jsx";
import AgentPrivatRoute from "./route/AgentPrivatRoute.jsx";

// admin related
import AdminProfile from "./AdminComponent/AdminProfile.jsx";
import ManageProperties from "./AdminComponent/ManageProperties.jsx";
import MangeUser from "./AdminComponent/MangeUser.jsx";
import ManageReview from "./AdminComponent/ManageReview.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRoute from "./route/AdminRoute.jsx";
import AdvertisementManage from "./AdminComponent/AdvertisementManage.jsx";
import UpdatePropertes from "./AgentComponent/UpdatePropertes.jsx";
import Offered from "./userCmponents/Offered.jsx";
import Payment from "./payment-form/Payment.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage> </ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        // loader: () => fetch("categori.json"),
      },
      // all food page rout
      {
        path: "/allProperties",
        element: (
          <PrivatRout>
            <AllProperties></AllProperties>
          </PrivatRout>
        ),
      },
      // details page rout
      {
        path: "/details/:_id",
        element: (
          <PrivatRout>
            <Details></Details>
          </PrivatRout>
        ),
        loader: ({ params }) =>
          fetch(`https://luxury-server.vercel.app/details/${params._id}`),
      },
      // log in rout
      {
        path: "/logIn",
        element: <Login></Login>,
      },

      //  regestation page rout
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
  // Dashboard page route
  {
    path: "Dashboard",
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // user route
      {
        path: "UserHome",
        element: (
          <PrivatRout>
            <UserHome></UserHome>
          </PrivatRout>
        ),
      },
      {
        path: "Myreviews",
        element: (
          <PrivatRout>
            <Myreviews></Myreviews>
          </PrivatRout>
        ),
      },
      // for payment
      {
        path: "payment/:id",
        element: (
          <PrivatRout>
            <Payment></Payment>
          </PrivatRout>
        ),
        loader: ({ params }) =>
          fetch(`https://luxury-server.vercel.app/paymentBrought/${params.id}`),
      },
      // for payment
      {
        path: "Propertybought",
        element: (
          <PrivatRout>
            <Propertybought></Propertybought>
          </PrivatRout>
        ),
      },
      {
        path: "Wishlist",
        element: (
          <PrivatRout>
            <Wishlist></Wishlist>
          </PrivatRout>
        ),
      },
      {
        path: "offerRequst/:_id",
        element: (
          <PrivatRout>
            <Offered></Offered>
          </PrivatRout>
        ),
        loader: ({ params }) =>
          fetch(
            `https://luxury-server.vercel.app/wishListForRequst/${params._id}`
          ),
      },
      // agent route
      {
        path: "Profile",
        element: (
          <AgentPrivatRoute>
            <AgentProfile></AgentProfile>
          </AgentPrivatRoute>
        ),
      },
      {
        path: "addNewItem",
        element: (
          <AgentPrivatRoute>
            <AddedNewItems></AddedNewItems>
          </AgentPrivatRoute>
        ),
      },
      {
        path: "myAddedProperties",
        element: (
          <AgentPrivatRoute>
            <MyAddedProperties></MyAddedProperties>
          </AgentPrivatRoute>
        ),
      },
      {
        path: "mySoldProperties",
        element: (
          <AgentPrivatRoute>
            <MySoldProperties></MySoldProperties>
          </AgentPrivatRoute>
        ),
      },
      {
        path: "requestedProperties",
        element: (
          <AgentPrivatRoute>
            <RequestedProperties></RequestedProperties>
          </AgentPrivatRoute>
        ),
      },
      {
        path: "update/:_id",
        element: (
          <AgentPrivatRoute>
            <UpdatePropertes></UpdatePropertes>
          </AgentPrivatRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://luxury-server.vercel.app/details/${params._id}`),
      },
      // admin route
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile></AdminProfile>
          </AdminRoute>
        ),
      },
      {
        path: "manageProperties",
        element: (
          <AdminRoute>
            <ManageProperties></ManageProperties>
          </AdminRoute>
        ),
      },
      {
        path: "advertisement",
        element: (
          <AdminRoute>
            <AdvertisementManage></AdvertisementManage>
          </AdminRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <MangeUser></MangeUser>
          </AdminRoute>
        ),
      },
      {
        path: "manageReview",
        element: (
          <AdminRoute>
            <ManageReview></ManageReview>
          </AdminRoute>
        ),
      },
    ],
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authentication>
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </Authentication>
    </QueryClientProvider>
  </React.StrictMode>
);

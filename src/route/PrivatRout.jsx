import React, { useContext } from "react";
import { AuthContext } from "../Authentication/Authentication";
import { Navigate, useLocation } from "react-router-dom";

const PrivatRout = ({ children }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center  text-5xl">
        <progress className="loading loading-infinity loading-lg "></progress>
      </div>
    );
  }
  if (currentUser) {
    return children;
  }

  return <Navigate state={location?.pathname} to={"/logIn"}></Navigate>;
};

export default PrivatRout;

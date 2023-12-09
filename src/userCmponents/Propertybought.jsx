import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Propertybought = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myBuyData = [], refetch } = useQuery({
    queryKey: ["myBuyData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`myBuy/${currentUser?.email}`);
      return res.data;
    },
  });
  useEffect(() => {
    refetch();
  }, [currentUser?.email, refetch]);
  console.log(myBuyData);

  return (
    <div>
      <h2 className="text-3xl font-semibold">My Bought Property </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {myBuyData.map((one) => (
          <div
            key={one._id}
            className="w-fill flex flex-col rounded-sm bg-slate-400 p-4">
            <div>
              <img
                src={one?.PropertieImage}
                className="max-h-60 mx-auto"
                alt=""
              />
            </div>
            <div className="flex-1 text-lg space-y-2">
              <p className="text-center text-3xl font-semibold">
                {one.PropertieTitle}
              </p>
              <p>Aocation : {one.location}</p>
              <p>Agent : {one.agentName}</p>
              <p> amount : {one.OfferedPrice}</p>
            </div>
            <div>
              <p className="flex justify-end">
                {one.requstStatus == "pending" && (
                  <button className="btn">Pending..</button>
                )}
                {one.requstStatus == "accepted" && (
                  <Link to={`/Dashboard/payment/${one?._id}`}>
                    <button className="btn">Pay Now</button>
                  </Link>
                )}
                {one.requstStatus == "rejected" && (
                  <button className="btn">Rejected</button>
                )}
                {one.requstStatus == "Bought" && (
                  <button className="btn">bought</button>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Propertybought;

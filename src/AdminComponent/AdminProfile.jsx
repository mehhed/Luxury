import React from "react";
import useAuth from "../hooks/useAuth";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdAdminPanelSettings, MdRealEstateAgent } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const AdminProfile = () => {
  const [isAdmin] = useAdmin();
  const { currentUser } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  let totalAdmin = users.filter((one) => one.role == "admin");
  let totalAgent = users.filter((one) => one.role == "agent");
  return (
    <div>
      <div>
        <h1 className="text-3xl font-semibold">
          {" "}
          Hi, {currentUser?.displayName}
        </h1>
        <div className="my-5 bg-[#fef9c3] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          {/* card */}
          <div className="stat bg-[#ffedd5] rounded-lg">
            <div className="stat-figure text-black">
              <FaUsers className="text-3xl"></FaUsers>
            </div>
            <div className="stat-title">Total Users</div>
            <div className="stat-value">{users.length}</div>
          </div>
          {/* card */}
          <div className="stat bg-[#ffedd5] rounded-lg">
            <div className="stat-figure text-black">
              <MdAdminPanelSettings className="text-3xl"></MdAdminPanelSettings>
            </div>
            <div className="stat-title">Total Admin</div>
            <div className="stat-value">{totalAdmin.length}</div>
          </div>
          {/* card */}
          <div className="stat bg-[#ffedd5] rounded-lg">
            <div className="stat-figure text-black">
              <MdRealEstateAgent className="text-3xl"></MdRealEstateAgent>
            </div>
            <div className="stat-title">Total Agent</div>
            <div className="stat-value">{totalAgent.length}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center mt-3">
          <div className="border-r-[#D1A054] border-r-2 bg-[#FFEDD5] flex-1 w-full flex justify-center flex-col items-center py-10">
            <img
              className="w-[200px] h-[200px] rounded-full"
              src={`${currentUser?.photoURL}`}
              alt=""
            />
            <h1 className="text-3xl mt-3 text-center font-semibold">
              {currentUser?.displayName}
            </h1>
          </div>
          <div className="p-5 h-full bg-[#FEF9C3]">
            <h1 className="text-3xl text-center font-semibold ">
              Your Activities
            </h1>
            <div className="text-lg mt-auto space-y-3">
              <p>Name : {currentUser?.displayName} </p>
              <p>Email : {currentUser?.email} </p>
              <p>Phone : {currentUser?.phoneNumber} </p>
              <p>Role : {isAdmin}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaBuilding, FaDollarSign, FaUser, FaUsers } from "react-icons/fa";

import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
const MySoldProperties = () => {
  const axionSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  const { data: soldProduct = [] } = useQuery({
    queryKey: [currentUser?.email, "requstData"],
    queryFn: async () => {
      const res = await axionSecure.get(`soldProduct/${currentUser?.email}`);
      return res.data;
    },
  });

  const soldAmount = soldProduct.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.OfferedPrice;
  }, 0);

  return (
    <div>
      <h1 className="text-3xl font-semibold">My Sold Properties</h1>
      <div className="my-5 bg-[#fef9c3] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black">
            <FaDollarSign className="text-3xl"></FaDollarSign>
          </div>
          <div className="stat-title">Total Sold Amount</div>
          <div className="stat-value">{soldAmount}</div>
        </div>
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total sold</div>
          <div className="stat-value">{soldProduct.length}</div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table rounded-none mt-3 table-zebra bg-[#FFEDD5]">
          {/* head */}
          <thead className="text-lg capitalize">
            <tr>
              <th>property title</th>
              <th>location</th>
              <th>buyer email</th>
              <th>buyer name</th>
              <th>sold price</th>
            </tr>
          </thead>
          <tbody>
            {soldProduct.map((one) => (
              <tr key={one._id}>
                <td> {one.PropertieTitle}</td>
                <td> {one.location}</td>
                <td>{one.buyeremail}</td>
                <td>{one.buyername}</td>
                <td>{one?.OfferedPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;
<h1>mySoldProperties</h1>;

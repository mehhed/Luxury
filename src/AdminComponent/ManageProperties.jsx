import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { MdVerified } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { FcProcess } from "react-icons/fc";

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const { data: allPropertes = [], refetch } = useQuery({
    queryKey: ["allPropertes", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allPropertesAdmin`);
      return res.data;
    },
  });

  //  function for verifyed properties
  const handleRequst = (propertie, respons) => {
    axiosSecure
      .patch(`/verifyed/${propertie._id}`, { respons })
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1 className="text-3xl font-semiboldse mb-3">manage properties </h1>
      <div className="overflow-x-auto">
        <table className="table rounded-none mt-3 table-zebra bg-[#FFEDD5]">
          {/* head */}
          <thead className="text-lg capitalize">
            <tr>
              <th>property title</th>
              <th>location</th>
              <th>agent email</th>
              <th>agent name</th>
              <th> price range</th>
              <th>verified</th>
              <th>reject</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {allPropertes.map((oneData) => (
              <tr key={oneData._id}>
                <td> {oneData?.PropertieTitle}</td>
                <td> {oneData?.location}</td>
                <td> {oneData?.agentEmail}</td>
                <td> {oneData?.agentName}</td>
                <td>
                  {" "}
                  {oneData?.maxPrice}$ - {oneData?.minPrice}$
                </td>
                <td>
                  {oneData?.status == "pending" && (
                    <button
                      onClick={() => handleRequst(oneData, "verifyed")}
                      className="btn btn-success">
                      verified
                    </button>
                  )}
                </td>
                <td>
                  {oneData.status == "pending" && (
                    <button
                      onClick={() => handleRequst(oneData, "rejected")}
                      className="btn btn-error">
                      reject
                    </button>
                  )}
                </td>
                <td>
                  {oneData.status == "verifyed" && (
                    <div className="text-green-800 font-semibold">
                      <p className="text-blue-600 text-3xl">
                        <MdVerified />
                      </p>
                    </div>
                  )}
                  {oneData.status == "rejected" && (
                    <div className="text-red-800 font-semibold">
                      <p className="text-red-600 text-3xl">
                        <ImBlocked />
                      </p>
                    </div>
                  )}
                  {oneData.status == "pending" && (
                    <div className="text-yellow-800 font-semibold">
                      <p className="text-blue-700 text-3xl">
                        <FcProcess />
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {/* {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.price}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.status}</td>
                        </tr>)} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;

import React, { useEffect } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

import { MdVerified } from "react-icons/md";
import { ImBlocked } from "react-icons/im";
import { FcProcess } from "react-icons/fc";
import { FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";

const RequestedProperties = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  //  get requst data to database
  const { data: requstData = [], refetch } = useQuery({
    queryKey: ["requstData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`requstData/${currentUser?.email}`);
      return res.data;
    },
  });
  // refetch when email change
  useEffect(() => {
    refetch();
  }, [currentUser?.email, refetch]);

  //  handle buyRequst
  const handleRrqustAcept = (data, respons) => {
    axiosSecure
      .patch(
        `/buyRequst?objectId=${data._id}&buyerEmail=${data?.buyerEmail}&productId=${data.productId}`,
        { respons }
      )
      .then((response) => {
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `your ${data.PropertieTitle} propertes requst is ${respons}`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">Requested Properties</h1>
      <div className="mt-3 overflow-x-auto">
        <table className="table rounded-none mt-3 table-zebra bg-[#FFEDD5]">
          {/* head */}
          <thead className="text-lg capitalize">
            <tr>
              <th>property title</th>
              <th>location</th>
              <th>buyer email</th>
              <th>buyer name</th>
              <th>offered price</th>
              <th>accept</th>
              <th>reject</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {requstData.map((one) => (
              <tr key={one._id}>
                <td> {one?.PropertieTitle}</td>
                <td> {one.location}</td>
                <td> {one?.buyerEmail}</td>
                <td> {one?.buyerName}</td>
                <td>{one?.OfferedPrice}$</td>
                <td>
                  <button
                    onClick={() => handleRrqustAcept(one, "accepted")}
                    disabled={one.requstStatus == "pending" ? false : true}
                    className="btn btn-success">
                    accept
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRrqustAcept(one, "rejected")}
                    disabled={one.requstStatus == "pending" ? false : true}
                    className="btn btn-error">
                    reject
                  </button>
                </td>
                {/*  status  */}
                <td>
                  {one.requstStatus == "accepted" && (
                    <div className="text-green-800 font-semibold">
                      <p className="text-green-600 text-3xl">
                        <FaCheckCircle />
                      </p>
                    </div>
                  )}
                  {one.requstStatus == "rejected" && (
                    <div className="text-red-800 font-semibold">
                      <p className="text-red-600 text-3xl">
                        <ImBlocked />
                      </p>
                    </div>
                  )}
                  {one.requstStatus == "pending" && (
                    <div className="text-yellow-800 font-semibold">
                      <p className="text-blue-700 text-3xl">
                        <FcProcess />
                      </p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RequestedProperties;

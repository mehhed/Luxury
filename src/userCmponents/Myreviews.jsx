import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";

const Myreviews = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  //  get reviws  data
  const { data: allreviws = [], refetch } = useQuery({
    queryKey: ["allComment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allComment/${currentUser?.email}`);
      return res.data;
    },
  });
  console.log(allreviws);
  // delete reviws
  const handaleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deleteRevew/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">My Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {allreviws.map((onereviw) => (
          <div
            key={onereviw._id}
            className="bg-white rounded-md shadow-md p-6 mb-4">
            <h2 className="text-xl font-bold mb-3">{onereviw?.productTitle}</h2>
            <p className="text-gray-600 mb-2">Agent: {onereviw?.agentName}</p>
            <p className="text-gray-600 mb-2">
              Review Time: {onereviw?.dateTime}
            </p>
            <hr />
            <p className="text-gray-700 mb-2">{onereviw?.commetContent}</p>
            <hr />
            <button
              onClick={() => handaleDelete(onereviw)}
              className="bg-red-500 text-white py-2 mt-3 px-4 rounded-md hover:bg-red-600">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myreviews;
<h1>Myreviews</h1>;

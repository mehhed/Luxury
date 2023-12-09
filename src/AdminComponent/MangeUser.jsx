import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin.jsx";

const MangeUser = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const [isAdmin] = useAdmin();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //  make admin
  const handleAdmin = (user) => {
    console.log();
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  //  make agent
  const handleAgent = (user) => {
    console.log();
    axiosSecure.patch(`/users/agent/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Agent Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  // delete user
  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
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

  // delete froud user data
  const handleFroud = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to froud on him?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes..",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/froud?email=${user?.email}&id=${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "",
                text: "makeing froud success",
                icon: "success",
              });
            }
          });
      }
    });
  };
  console.log(users);
  return (
    <div>
      <h2 className="text-3xl font-semibold capitalize mb-3">manage user </h2>
      <div className="overflow-x-auto">
        <table className="table rounded-none mt-3 table-zebra bg-[#FFEDD5]">
          {/* head */}
          <thead className="text-lg capitalize">
            <tr>
              <th>use name</th>
              <th>use email</th>
              <th>Make admin</th>
              <th>Make agent</th>
              <th>fraud</th>
              <th>Delete user</th>
            </tr>
          </thead>
          <tbody>
            {users.map((oneUser) => (
              <>
                <tr>
                  <td>{oneUser.name}</td>
                  <td> {oneUser.email}</td>
                  <td>
                    <button
                      onClick={() => handleAdmin(oneUser)}
                      disabled={
                        (currentUser?.email == oneUser?.email && true) ||
                        (oneUser?.role == "admin" && true)
                      }
                      className="btn btn-success">
                      admin
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleAgent(oneUser)}
                      disabled={
                        (currentUser?.email == oneUser?.email && true) ||
                        (oneUser?.role == "agent" && true)
                      }
                      className="btn btn-success">
                      agent
                    </button>
                  </td>

                  <td>
                    {oneUser.role == "user" || (
                      <button
                        onClick={() => handleFroud(oneUser)}
                        disabled={
                          currentUser?.email == oneUser?.email ||
                          (oneUser.role == "froud" && true)
                        }
                        className="btn btn-error">
                        fraud
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDeleteUser(oneUser)}
                      disabled={currentUser?.email == oneUser?.email && true}
                      className="btn btn-error">
                      delete
                    </button>
                  </td>
                </tr>
              </>
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

export default MangeUser;

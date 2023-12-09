import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Wishlist = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  //  get reviws  data
  const { data: allWishList = [], refetch } = useQuery({
    queryKey: ["allComment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${currentUser?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch, currentUser]);

  console.log(allWishList);
  // delete wishList
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
        axiosSecure.delete(`/deleteWishList/${user._id}`).then((res) => {
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
      <h2 className="text-3xl  mb-3">My Wishlist</h2>
      {/* card  container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* card  */}
        {allWishList.map((one) => (
          <div key={one._id} className="shadow-inner bg-gray-400 rounded-lg">
            <div className="shadow-inner h-full shadow-slate-200 bg-[#FFEDD5] card  flex flex-col">
              <figure className="relative">
                <img className="mb-5 max-h-60" src={one?.PropertieImage} />
                <div className=" w-full bg-[#bfbfbf] opacity-90 absolute bottom-0 left-0 px-3 py-2 rounded-md">
                  <h2 className="card-title text-black">
                    {one?.PropertieTitle}
                  </h2>
                </div>
              </figure>
              <div className="card-body p-0">
                {/* agernt information  */}
                <div className="my-2 flex gap-2 items-center">
                  <div className="flex gap-2 items-center ">
                    <div className="">
                      <img
                        className="w-16 rounded-full"
                        src={one?.agenrImage}
                      />
                    </div>
                    <div>{one?.agentName}</div>
                  </div>
                  {/* verified icon  */}
                  <p className=" top-2 right-2 text-blue-600 text-3xl">
                    <MdVerified />
                  </p>
                </div>
                <div className="flex flex-wrap">
                  <p className="text-3xl">
                    ${one?.minPrice} - ${one?.maxPrice}
                  </p>
                  <a href="" className="flex mt-4 items-center gap-2">
                    <span className="text-2xl">
                      <FaLocationDot />
                    </span>
                    {one?.location}
                  </a>
                </div>
              </div>
              <div className="card-actions  justify-center mt-4">
                <button
                  onClick={() => handaleDelete(one)}
                  className="btn btn-sm">
                  remove
                </button>
                <Link to={`/Dashboard/offerRequst/${one._id}`}>
                  <button className="btn btn-sm">Make an offer</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

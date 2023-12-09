import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Details = () => {
  const axionSecure = useAxiosSecure();
  const data = useLoaderData();
  const [propertieDetails] = data;
  const { currentUser } = useContext(AuthContext);
  const buyerEmail = currentUser?.email;
  //  get reviws  data
  const { data: allreviws = [], refetch } = useQuery({
    queryKey: ["allreviws"],
    queryFn: async () => {
      const res = await axionSecure.get(`/allreviws/${propertieDetails?._id}`);
      return res.data;
    },
  });
  console.log(allreviws);

  const handleBuy = async () => {
    const PropertieTitle = propertieDetails?.PropertieTitle;
    const PropertieImage = propertieDetails?.PropertieImage;
    const maxPrice = propertieDetails?.maxPrice;
    const minPrice = propertieDetails?.minPrice;
    const location = propertieDetails?.location;
    const status = propertieDetails?.status;
    const totalBath = propertieDetails?.totalBath;
    const totalBed = propertieDetails?.totalBed;
    const advartise = propertieDetails?.advartise;
    const agenImage = propertieDetails?.agenImage;
    const agentName = propertieDetails?.agentName;
    const agentEmail = propertieDetails?.agentEmail;
    const size = propertieDetails?.size;
    const wishlist_res = await axionSecure.post("/wishlist", {
      PropertieTitle,
      PropertieImage,
      maxPrice,
      minPrice,
      location,
      buyerEmail,
      productId: propertieDetails._id,
      status,
      size,
      agenImage,
      agentEmail,
      agentName,
      totalBed,
      advartise,
      totalBath,
    });
    if (wishlist_res?.data?.insertedId) {
      refetch();
      // show success popup
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${propertieDetails?.PropertieTitle} is added to your wishlist`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(wishlist_res?.data?.insertedId);
  };

  //  comment post function
  const handleComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const commetContent = form.comment.value;
    const reviwerName = currentUser?.displayName;
    const reviwerEmail = currentUser?.email;
    const reviwerImage = currentUser?.photoURL;
    const productId = propertieDetails?._id;
    const productTitle = propertieDetails?.PropertieTitle;
    const agentName = propertieDetails?.agentName;
    const agentEmail = propertieDetails?.agentEmail;
    const date = new Date();
    const dateTime = date.toLocaleString();

    const comment_res = await axionSecure.post("/allComment", {
      commetContent,
      reviwerEmail,
      reviwerName,
      productId,
      reviwerImage,
      productTitle,
      dateTime,
      agentName,
      agentEmail,
    });
    if (comment_res?.data?.insertedId) {
      refetch();
      // show success popup
      form.reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `thank you for your reviws`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>ecoFood | Details | {propertieDetails?.PropertieTitle}</title>
      </Helmet>
      <div className=" my-5 space-y-5 py-10 px-5  mx-auto shadow-inner shadow-slate-500 rounded-lg">
        <div className=" grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex justify-center items-center">
            <img
              src={propertieDetails?.PropertieImage}
              alt=""
              className="mx-auto h-full"
            />
          </div>
          <div>
            <p className="text-3xl font-bold">
              {propertieDetails?.PropertieTitle}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              Location : {propertieDetails?.location}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              Price Range : {propertieDetails?.minPrice}$ -{" "}
              {propertieDetails?.maxPrice}$
            </p>
            <p className="text-lg text-gray-800 mt-3">
              Size : {propertieDetails?.size}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              Bath : {propertieDetails?.totalBath}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              Bed : {propertieDetails?.totalBed}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              agent name : {propertieDetails?.agentName}
            </p>
            <p className="text-lg text-gray-800 mt-3">
              agent email : {propertieDetails?.agentEmail}
            </p>
            <p className="mt-3 flex gap-3">
              <button onClick={handleBuy} className="btn">
                Add to Wishlist
              </button>
              {/* The button to open modal */}
              <label htmlFor="my_modal_7" className="btn">
                Add a reviw
              </label>
            </p>
          </div>
        </div>
      </div>
      {/* _____________________________________________________________________________________ */}
      {/* reviw box  */}
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form className="mb-3" onSubmit={handleComment}>
            <textarea
              className="outline-gray-300 p-3 border  w-full rounded-lg"
              name="comment"
              required
              id=""
              placeholder=" Input your comment"
              rows="3"></textarea>
            <br />
            <div className="flex justify-end">
              <input type="submit" className="btn" value="Submit" />
            </div>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
      {/* __________________________________________________________________________________ */}
      {/* old reviw */}
      <h1 className="text-3xl font-semibold text-center my-3">
        All <span className="text-green-900">Reviws</span>
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-5 mb-5">
        {/* card  */}
        {allreviws.map((oneCommetn) => (
          <div key={oneCommetn._id}>
            <div className="my-2 flex gap-2 items-center">
              <div className="">
                <img
                  className="w-16 rounded-full"
                  src={oneCommetn?.reviwerImage}
                />
              </div>
              <div>
                <p className="text-lg">{oneCommetn?.reviwerName}</p>
                <p className="text-[12px] -mt-2">{oneCommetn?.reviwerEmail}</p>
              </div>
            </div>
            <div className="p-5 shadow-inner shadow-slate-400 rounded-lg">
              {oneCommetn?.commetContent}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;

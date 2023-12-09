import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Offered = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  console.log(currentUser);

  //   use state for error hanleing
  const [error, setError] = useState("");

  const data = useLoaderData();
  const [propertieDetails] = data;

  console.log(data);

  const handleAddItems = async (e) => {
    e.preventDefault();
    const form = e.target;
    const getPrice = form.OfferedPrice.value;
    const OfferedPrice = parseFloat(getPrice);
    if (OfferedPrice < propertieDetails?.minPrice) {
      return setError(
        `you can not offer less then minimum price (${propertieDetails?.minPrice}tk)`
      );
    } else if (OfferedPrice > propertieDetails?.maxPrice) {
      return setError(
        `you can not offer getter then maximum price (${propertieDetails?.maxPrice}tk)`
      );
    }
    //  update img
    const menuItem = {
      PropertieTitle: propertieDetails.PropertieTitle,
      productId: propertieDetails.productId,
      PropertieImage: propertieDetails.PropertieImage,
      location: propertieDetails.location,
      size: propertieDetails.size,
      totalBath: propertieDetails.totalBath,
      totalBed: propertieDetails.totalBed,
      status: propertieDetails.status,
      agenImage: propertieDetails.agenImage,
      agentEmail: propertieDetails.agentEmail,
      agentName: propertieDetails.agentName,
      buyerEmail: propertieDetails.buyerEmail,
      buyerName: currentUser.displayName,
      OfferedPrice,
      requstStatus: "pending",
    };
    //
    console.log(menuItem);
    const menuRes = await axiosSecure.post(`/requst`, menuItem);
    if (menuRes?.data?.insertedId) {
      // show success popup
      form.reset();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `your ${propertieDetails.PropertieTitle} propertes requst is successfull...`,
        showConfirmButton: false,
        timer: 1500,
      });
      axiosSecure
        //    delete form wishList
        .delete(`/deleteWishList/${propertieDetails._id}`);
      //  navigate to wishlist
      navigate("/Dashboard/Wishlist");
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mb-7">
        <span className="pb-3 border-b-2">Make a Requst</span>
      </h1>
      <div>
        <form onSubmit={handleAddItems}>
          <div className="grid lg:grid-cols-2 grid-cols-1  gap-5">
            <div>
              <label htmlFor="Name" className="text-lg font-bold">
                Propertie title
              </label>
              <input
                type="text"
                name="Name"
                id="PropertieTitle"
                className="w-full p-4 rounded-lg border-2"
                placeholder="Name"
                required
                readOnly
                defaultValue={propertieDetails.PropertieTitle}
              />
            </div>
            <div>
              <label htmlFor="BrandName" className="text-lg font-bold">
                Agent Name
              </label>
              <input
                type="text"
                name="Quantity"
                id="AgentName"
                placeholder="Agent Name"
                className=" w-full p-4 rounded-lg border-2"
                required
                readOnly
                defaultValue={propertieDetails.agentName}
              />
            </div>
            <div>
              <label htmlFor="buyerName" className="text-lg font-bold">
                Buyer name
              </label>
              <input
                type="text"
                name="buyerName"
                id="buyerName"
                placeholder="Buyer Name"
                className=" w-full p-4 rounded-lg border-2"
                required
                readOnly
                defaultValue={currentUser.displayName}
              />
            </div>

            <div>
              <label htmlFor="buyerEmail" className="text-lg font-bold">
                Buyer Email
              </label>
              <input
                type="text"
                name="buyerEmail"
                id="buyerEmail"
                placeholder="Buyer Email"
                className=" w-full p-4 rounded-lg border-2"
                required
                readOnly
                defaultValue={propertieDetails?.buyerEmail}
              />
            </div>

            <div>
              <label htmlFor="location" className="text-lg font-bold">
                location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="location"
                required
                readOnly
                defaultValue={propertieDetails.location}
              />
            </div>
            <div>
              <label htmlFor="bed" className="text-lg font-bold">
                total bed Romm
              </label>
              <input
                type="number"
                name="bed"
                id="bed"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="total bed"
                required
                readOnly
                defaultValue={propertieDetails.totalBed}
              />
            </div>
            <div>
              <label htmlFor="bath" className="text-lg font-bold">
                total bath
              </label>
              <input
                type="number"
                name="bath"
                id="bath"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="total bath"
                required
                readOnly
                defaultValue={propertieDetails.totalBath}
              />
            </div>
            <div>
              <label htmlFor="size" className="text-lg font-bold">
                size
              </label>
              <input
                type="text"
                name="size"
                id="size"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="size"
                required
                readOnly
                defaultValue={propertieDetails.size}
              />
            </div>
            <div>
              <label htmlFor="OfferedPrice" className="text-lg font-bold">
                Offered Price
              </label>
              <input
                type="number"
                name="OfferedPrice"
                id="OfferedPrice"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="Offered Price"
                required
              />
              {error && <p className="text-red-700">{error}</p>}
            </div>
          </div>
          <button className="w-full py-5 bg-blue-600 rounded-lg text-white text-2xl font-semibold mt-5">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Offered;

import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Authentication/Authentication";
import { Helmet } from "react-helmet-async";
import { useNavigation } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMG_HOSTIMG_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddedNewItems = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  console.log(currentUser?.email);

  const handleAddItems = async (e) => {
    e.preventDefault();
    const form = e.target;
    const PropertieTitle = form.PropertieTitle.value;
    const Image = form.Image.files[0];
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const AgentName = form.AgentName.value;
    const totalBed = form.bed.value;
    const totalBath = form.bath.value;
    const size = form.size.value;
    const location = form.location.value;
    const advartise = false;

    const agenImage = currentUser?.photoURL;
    const status = "pending";
    const agentEmail = currentUser?.email;
    const agentName = currentUser?.displayName;

    // post img to img bb and get url
    console.log(Image);

    const imageFile = { image: Image };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      // now send the menu item data to the server with the image url
      const menuItem = {
        PropertieTitle,
        PropertieImage: res.data.data.display_url,
        maxPrice: parseFloat(maxPrice),
        minPrice: parseFloat(minPrice),
        location,
        size,
        totalBath,
        totalBed,
        status,
        advartise,
        agenImage,
        agentEmail,
        agentName,
      };
      //
      console.log(menuItem);
      const menuRes = await axiosSecure.post("/allPropertes", menuItem);
      console.log(menuRes.data);
      if (menuRes?.data?.insertedId) {
        // show success popup
        form.reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${PropertieTitle} is added to the menu.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>Luxury | Add Product</title>
      </Helmet>
      <h1 className="text-center text-4xl my-5 font-bold">Add a new item</h1>
      <div className="bg-[#efefef] p-5 rounded-lg">
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
                className="w-full p-4 rounded-lg"
                placeholder="Name"
                required
              />
            </div>
            <div>
              <label htmlFor="Image" className="text-lg font-bold">
                Image
              </label>
              <input
                type="file"
                name="Image"
                id="Image"
                className=" w-full p-4 rounded-lg border-2"
                placeholder="Image url"
                required
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
                className=" w-full p-4 rounded-lg"
                required
                readOnly
                defaultValue={currentUser?.displayName}
              />
            </div>
            <div>
              <label htmlFor="Price" className="text-lg font-bold">
                Min Price
              </label>
              <input
                type="number"
                name="minPrice"
                id="Price"
                className=" w-full p-4 rounded-lg"
                placeholder=" Min Price"
                required
                min={0}
              />
            </div>
            <div>
              <label htmlFor="Price" className="text-lg font-bold">
                Max Price
              </label>
              <input
                type="number"
                name="maxPrice"
                id="Price"
                className=" w-full p-4 rounded-lg"
                placeholder=" Max Price"
                required
                min={0}
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
                className=" w-full p-4 rounded-lg"
                placeholder="location"
                required
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
                className=" w-full p-4 rounded-lg"
                placeholder="total bed"
                required
                min={0}
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
                className=" w-full p-4 rounded-lg"
                placeholder="total bath"
                required
                min={0}
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
                className=" w-full p-4 rounded-lg"
                placeholder="size"
                required
              />
            </div>
          </div>
          <button className="w-full py-5 bg-blue-600 rounded-lg text-white text-2xl font-semibold mt-5">
            Add item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddedNewItems;

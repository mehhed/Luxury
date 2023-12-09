import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useLoaderData, useNavigate } from "react-router-dom";

//  handle update properties
const UpdatePropertes = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  //  get data
  const data = useLoaderData();
  const [propertieDetails] = data;
  console.log(propertieDetails);

  const handleAddItems = async (e) => {
    e.preventDefault();
    const form = e.target;
    const PropertieTitle = form.PropertieTitle.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const AgentName = form.AgentName.value;
    const totalBed = form.bed.value;
    const totalBath = form.bath.value;
    const size = form.size.value;
    const location = form.location.value;
    const advartise = propertieDetails.advartise;

    const agenImage = propertieDetails.agenImage;
    const status = propertieDetails.status;
    const agentEmail = propertieDetails.agentEmail;

    // post img to img bb and get url
    console.log(Image);

    //  update img
    const menuItem = {
      PropertieTitle,
      PropertieImage: propertieDetails.PropertieImage,
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
      AgentName,
    };
    //
    console.log(menuItem);
    const menuRes = await axiosSecure.patch(
      `/allPropertes/${propertieDetails._id}`,
      menuItem
    );
    console.log(menuRes.data);
    if (menuRes?.data?.modifiedCount > 0) {
      // show success popup
      form.reset();

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${PropertieTitle} is update...`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/Dashboard/myAddedProperties");
    }
  };

  return (
    <>
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
                defaultValue={propertieDetails?.PropertieTitle}
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
                defaultValue={propertieDetails.AgentName}
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
                className=" w-full p-4 rounded-lg border-2"
                placeholder=" Min Price"
                required
                defaultValue={propertieDetails.minPrice}
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
                className=" w-full p-4 rounded-lg border-2"
                placeholder=" Max Price"
                required
                defaultValue={propertieDetails.maxPrice}
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
                className=" w-full p-4 rounded-lg border-2"
                placeholder="location"
                required
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
                defaultValue={propertieDetails.totalBed}
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
                className=" w-full p-4 rounded-lg border-2"
                placeholder="total bath"
                required
                defaultValue={propertieDetails.totalBath}
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
                className=" w-full p-4 rounded-lg border-2"
                placeholder="size"
                required
                defaultValue={propertieDetails.size}
              />
            </div>
          </div>
          <button className="w-full py-5 bg-blue-600 rounded-lg text-white text-2xl font-semibold mt-5">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdatePropertes;

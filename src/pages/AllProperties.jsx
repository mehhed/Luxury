import { useEffect, useState, useTransition } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { MdVerified } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Allfood = () => {
  const axiosSecure = useAxiosSecure();

  const [allData, setAllData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [asc, setAsc] = useState(false);
  const [propertys, setPropertys] = useState([]);

  const { data: allPropertesPage = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allPropertesPage`);
      return setAllData(res.data);
    },
  });

  // for searchbar
  const filteredData = allData?.filter((item) => {
    if (item && item.PropertieTitle) {
      return item.PropertieTitle.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
    }

    return false;
  });

  function handlesortIng(requst) {
    if (requst == "lowToHigh") {
      const LowToHighData = allData
        .slice()
        .sort((a, b) => a.minPrice - b.minPrice);
      setAllData(LowToHighData);
      console.log(LowToHighData);
    } else if (requst == "highToLow") {
      const sortedHighToLow = allData
        .slice()
        .sort((a, b) => b.minPrice - a.minPrice);
      setAllData(sortedHighToLow);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Laxury | All propertisce </title>
      </Helmet>
      {/* search bar and filter */}
      <div className="flex  mt-5 justify-between  mb-5">
        {/* dropdown */}
        <div className="dropdown dropdown-bottom">
          <div tabIndex={0} role="button" className="btn m-1">
            sort by price
          </div>
          <ul className="dropdown-content z-[1] menu  shadow bg-base-100  w-52">
            <li>
              <button
                className=" rounded-none"
                onClick={() => handlesortIng("lowToHigh")}>
                low to high
              </button>
            </li>
            <li>
              <button
                className=" rounded-none border-t-2"
                onClick={() => handlesortIng("highToLow")}>
                high to low
              </button>
            </li>
          </ul>
        </div>
        {/* serch bar  */}
        <input
          type="text"
          className="bg-gray-200 rounded-s-lg p-2 h-12"
          name="sarchFeild"
          id=""
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/*  all propertiece  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        {/* card  */}
        {filteredData.map((onedata) => (
          <div
            key={onedata._id}
            className="shadow-inner bg-gray-400 h-full rounded-lg relative">
            <div className="shadow-inner shadow-slate-200 h-full card bg-base-100 flex flex-col">
              <figure className="relative">
                <img className="mb-5 max-h-60" src={onedata?.PropertieImage} />
                <div className=" w-full bg-[#bfbfbf] absolute bottom-0 left-0 px-3 py-2 rounded-md">
                  <h2 className="card-title text-black">
                    {onedata?.PropertieTitle}
                  </h2>
                </div>
              </figure>
              <div className="card-body p-0 flex-1">
                {/* agernt information  */}
                <div className="my-2 flex gap-2 items-center">
                  <div className="">
                    <img
                      className="w-16 rounded-full"
                      src={onedata.agenImage}
                    />
                  </div>
                  <div>{onedata?.agentName}</div>
                </div>
                <div>
                  <p className="text-2xl">
                    {onedata?.minPrice}$ - {onedata?.maxPrice}$
                  </p>
                  <Link to={""} className="flex mt-4 items-center gap-2">
                    <span className="text-2xl">
                      <FaLocationDot />
                    </span>
                    {onedata.location}
                  </Link>
                </div>
              </div>
              <div className="card-actions justify-center mt-2">
                <Link to={`/details/${onedata._id}`}>
                  <button className="btn">see details</button>
                </Link>
              </div>
            </div>
            {/* verified icon  */}
            <p className="absolute top-2 right-2 text-blue-600 text-5xl">
              <MdVerified />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Allfood;

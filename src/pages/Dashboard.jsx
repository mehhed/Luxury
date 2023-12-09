import { useState } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { CgMenuGridO } from "react-icons/cg";
import { IoClose } from "react-icons/io5";
const Blog = () => {
  const [nav, setNav] = useState(false);

  const [isAdmin] = useAdmin();

  const userRole = isAdmin;
  return (
    <div className="h-screen w-full  flex">
      {/* sidebar */}
      <div className="absolute top-0 left-0-0 lg:relative z-50">
        <span
          className="lg:hidden text-3xl p-2 font-bold bg-white rounded-e-md top-2 absolute"
          onClick={() => setNav(!nav)}>
          {nav == false ? <CgMenuGridO></CgMenuGridO> : <IoClose></IoClose>}
        </span>
        <div
          className={`bg-[#D1A054] text-white h-screen w-64 lg:flex flex-col ${
            nav == true ? "flex" : "hidden"
          } `}>
          {/* Your navigation links go here */}
          <p className="text-3xl text-center font-semibold my-5">Laxury</p>
          <hr />
          <Link to={"/"} className="py-2 px-4 hover:bg-gray-700">
            Home
          </Link>
          <hr />

          {/* for agent  */}
          {userRole == "agent" && (
            <>
              {" "}
              <Link
                to={"/Dashboard/Profile"}
                className="py-2 px-4 hover:bg-gray-700">
                agent Profile
              </Link>
              <Link
                to={"/Dashboard/myAddedProperties"}
                className="py-2 px-4 hover:bg-gray-700">
                My added properties
              </Link>
              <Link
                to={"/Dashboard/mySoldProperties"}
                className="py-2 px-4 hover:bg-gray-700">
                My sold properties
              </Link>
              <Link
                to={"/Dashboard/requestedProperties"}
                className="py-2 px-4 hover:bg-gray-700">
                Requested properties
              </Link>
              <Link
                to={"/Dashboard/addNewItem"}
                className="py-2 px-4 hover:bg-gray-700">
                Add Item
              </Link>
            </>
          )}
          {/* for admin  */}
          {userRole == "admin" && (
            <>
              <Link
                to={"/Dashboard/adminProfile"}
                className="py-2 px-4 hover:bg-gray-700">
                admin Profile
              </Link>
              <Link
                to={"/Dashboard/manageProperties"}
                className="py-2 px-4 hover:bg-gray-700">
                Manage Properties
              </Link>
              <Link
                to={"/Dashboard/advertisement"}
                className="py-2 px-4 hover:bg-gray-700">
                Advertisement Properties
              </Link>
              <Link
                to={"/Dashboard/manageUser"}
                className="py-2 px-4 hover:bg-gray-700">
                Manage Users
              </Link>
              <Link
                to={"/Dashboard/manageReview"}
                className="py-2 px-4 hover:bg-gray-700">
                Manage reviews
              </Link>
            </>
          )}
          {/* normal user  */}
          {userRole == "user" && (
            <>
              <Link
                to={"/Dashboard/UserHome"}
                className="py-2 px-4 hover:bg-gray-700">
                Profile
              </Link>
              <Link
                to={"/Dashboard/Wishlist"}
                className="py-2 px-4 hover:bg-gray-700">
                Wishlist
              </Link>
              <Link
                to={"/Dashboard/Propertybought"}
                className="py-2 px-4 hover:bg-gray-700">
                Property bought
              </Link>
              <Link
                to={"/Dashboard/Myreviews"}
                className="py-2 px-4 hover:bg-gray-700">
                My reviews
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="p-5 flex-1 lg:h-screen lg:overflow-y-scroll mt-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Blog;

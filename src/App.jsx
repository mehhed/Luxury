import "./App.css";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Authentication/Authentication";
import { Helmet } from "react-helmet-async";
import {
  FaFacebook,
  FaLinkedin,
  FaPhone,
  FaTwitch,
  FaTwitter,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";

function App() {
  const { currentUser } = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(navigation);
  return (
    <div className="flex flex-col h-screen px-5">
      <Navbar></Navbar>
      {navigation.state === "loading" ? (
        <div className="h-full flex-grow w-full flex justify-center items-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div className="flex-grow">
          <Outlet></Outlet>
        </div>
      )}
      <Helmet>
        <title>Luxury | Home</title>
      </Helmet>

      {/* footer section  */}
      <footer className=" p-5 shadow-inner shadow-slate-400">
        <div className="lg:flex justify-between gap-10 items-center grid grid-cols-1">
          <div className="flex-1">
            <img
              src="https://raw.githubusercontent.com/mehhed/assignment-eleven-image/main/Blue%20Illustrative%20Luxury%20Real%20Estate%20Logo%20(1).png"
              alt=""
              className="w-28 h-28 rounded-full"
            />
            <div className="hover:ml-5 transition-all inline-block">
              <p className="font-semibold">
                <span className="text-5xl  ">Luxury</span>
                Better for Life
              </p>
            </div>
            <p className="text-lg italic text-gray-700 mt-3 text-justify">
              Explore a world of possibilities with our real estate website,
              where dreams meet addresses. Discover a diverse range of listings
              tailored to your unique preferences. Our user-friendly interface
              simplifies the search for your ideal home, ensuring a seamless and
              enjoyable experience. Your dream property is just a click away!
            </p>
            <p className="flex flex-wrap gap-5 mt-5">
              <a href="https://www.facebook.com/mehedihasan.rifat.52056">
                <FaFacebook className="text-3xl"></FaFacebook>
              </a>
              <a href="">
                <FaLinkedin className="text-3xl"></FaLinkedin>
              </a>
              <a href="">
                <FaTwitter className="text-3xl"></FaTwitter>
              </a>
            </p>
          </div>
          <div className="flex-1 ">
            <div className=" flex flex-wrap gap-5 h-full w-full">
              <Link
                to={"/"}
                className=" hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
                Home
              </Link>
              <Link
                to={currentUser ? "/allProperties" : "/logIn"}
                className=" hover:shadow-lg p-2 rounded-lg hover:shadow-slate-500">
                All properties
              </Link>
            </div>
            <div className="mt-3 space-y-2">
              <p className="flex gap-2 items-center">
                <IoLocation className="text-3xl"></IoLocation> Dhaka, Bangladesh
              </p>
              <p className="flex gap-2 items-center">
                <FaPhone className="text-2xl"></FaPhone> +880193399**
              </p>
              <p className="flex gap-2 items-center">
                <IoMdMail className="text-2xl"></IoMdMail> luxury@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="text-center  pt-5 mt-5 border-t-2">
          © 2023 Luxury. All rights reserved. Privacy Policy | Terms of Service
          | Contact Us
        </div>
      </footer>
    </div>
  );
}

export default App;

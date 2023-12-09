import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";
import Swal from "sweetalert2";
import { MdVerified } from "react-icons/md";
import { FaBuilding, FaDollarSign } from "react-icons/fa";

// import for swiper slider
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { FaLocationDot } from "react-icons/fa6";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { currentUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  //  use state for advertise ment section
  const [advertise, setAdvertise] = useState([]);

  //  use state for whatWeProvide  section
  const [whatWeProvide, setWhatWeProvide] = useState([]);

  //  use state for whatWeProvide  section
  const [reviw, setreviw] = useState([]);

  // use state for galley
  const [gallery, setGallery] = useState([]);
  useEffect(() => {
    fetch("https://luxury-server.vercel.app/img")
      .then((req) => req.json())
      .then((res) => setGallery(res));

    fetch("https://luxury-server.vercel.app/allComment")
      .then((req) => req.json())
      .then((res) => setreviw(res));

    //  get advertise section data
    axiosPublic.get("/advartise").then((response) => {
      setAdvertise(response.data);
    });

    // whatWeProvide
    axiosPublic.get("/whatWeProvide").then((response) => {
      setWhatWeProvide(response.data);
    });
  }, [axiosPublic]);

  //  function for contact form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    Swal.fire({
      icon: "success",
      title: "Our teem will contact with you...",
    });
    form.reset();
  };

  return (
    <div>
      {/* banner section */}
      <div className="flex flex-col-reverse lg:flex-row text-center gap-5 p-5 pr-0 bg-[#f5f3f3] shadow-inner  shadow-slate-300 ">
        <div className="flex-grow flex items-center ">
          <div className="w-full">
            <h1 className="lg:text-left lg:text-7xl md:text-3xl text-2xl font-semibold">
              Luxury <span className="text-[#5e3b31]">Agency</span>
            </h1>
            <p className="lg:text-left text-[#5e3b31] text-xl my-5">
              The solution for those of you who are <br /> looking for a
              comfortable place to live
            </p>
            <p className="lg:text-left mt-7 text-4xl font-bold text-[#5e3b31]">
              + + + + <br /> + + + +
            </p>
          </div>
        </div>
        <div className="flex-grow">
          <img
            className="w-4/5 ml-auto"
            src="https://raw.githubusercontent.com/mehhed/assignment-eleven-image/main/istockphoto-172363795-612x612-removebg-preview.png"
            alt=""
          />
        </div>
      </div>

      {/* Top propertes */}
      <div className=" shadow-inner shadow-slate-400  p-5">
        <h1 className="text-center text-5xl font-medium  font-serif">
          Top <span className="text-yellow-400 ">propertes</span>
        </h1>
        {/* top propertes card here  */}
        <div className="grid grid-cols-1 md:grid-cols-2   gap-4 my-5 lg:grid-cols-3">
          {advertise.map((one) => (
            <div key={one._id} className="h-full relative">
              <div className="rounded-lg h-full shadow-inner shadow-slate-400 p-5">
                <div>
                  <img className="mx-auto" src={one?.PropertieImage} alt="" />
                </div>
                <div>
                  <p className="text-2xl text-center mb-3">
                    {one.PropertieTitle}
                  </p>
                  <p>
                    Price : {one?.minPrice}$ - {one?.maxPrice}$
                  </p>
                  <p className="flex items-center gap-3">
                    <FaLocationDot></FaLocationDot> {one?.location}
                  </p>
                </div>
                <div className="flex justify-center  mt-3">
                  <Link to={`/details/${one._id}`}>
                    <button className="btn">see details</button>
                  </Link>
                </div>
                {one?.status == "verifyed" && (
                  <p className="absolute top-10 right-2 bg-white p-5 rounded-s-full rounded-e-none text-blue-600 text-5xl">
                    <MdVerified />
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* see all button */}
        <div className="mt-5 text-center">
          <button className="btn btn-info">
            {" "}
            <Link to={`${currentUser ? "/allProperties" : "/logIn"}`}>
              see all
            </Link>
          </button>
        </div>
      </div>

      {/* what we provide section */}
      <div className="p-4 py-5">
        <h1 className="text-center text-4xl font-semibold mb-5">
          What we are providing
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {whatWeProvide.map((one) => (
            <div
              key={one._id}
              className="h-full p-5 rounded-md border-2 boreder-2 ">
              <p className="text-4xl  mb-4 font-semibold text-gray-500-700 ">
                <span>
                  <FaBuilding></FaBuilding>
                </span>
              </p>
              <p className="text-center text-3xl font-semibold">{one.title}</p>
              <p className="text-lg text-justify">{one.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* gallery section  */}
      <div className="p-5 rounded-lg mt-5 shadow-inner shadow-slate-500">
        <div className="">
          <h1 className="text-center text-5xl font-serif font-medium py-5">
            Our <span className="text-yellow-500">Gallery</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 py-5  ">
            {gallery.slice(0, 8).map((gl) => (
              <>
                <div className="h-40 relative rounded-lg gallery-img-contaner shadow-inner  shadow-slate-200 p-5">
                  <img
                    src={gl?.PropertieImage}
                    className="h-full mx-auto"
                    alt=""
                  />
                  <div className="absolute top-0 right-0 text-3xl font-bold text-purple-400 w-full h-full flex justify-center items-center bg-black bg-opacity-50 rounded-lg gallery-img-name">
                    {gl?.PropertieTitle}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>

      {/* reviw section */}
      <div className="mt-5 py-5 shadow-inner shadow-slate-500   bg-team">
        <div className="team">
          <h1 className="text-5xl font-semibold text-center mb-5">
            Happy<span className="text-orange-500"> Clients</span>
          </h1>
          <div>
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper">
              {reviw.map((one) => (
                <SwiperSlide key={one._id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
                    <div className="p-5">
                      <img
                        className="w-[300px] mx-auto h-[300px] rounded-full outline-4"
                        src={one.reviwerImage}
                        alt=""
                      />
                    </div>
                    <div className="p-5 flex-1">
                      <div className="text-end text-7xl">”</div>
                      <p className="text-3xl ">{one.reviwerName}</p>
                      <p className="text-lg text-gray-600 text-justify mt-5 italic">
                        {one.commetContent}
                      </p>
                      <p className="mt-6">- {one.productTitle}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* contact section  */}
      <div className="shadow-inner shadow-slate-500 rounded-lg p-5 mt-5">
        <h1 className="text-6xl text-center my-4">
          Conatact <span className="text-yellow-400">us</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex-1">
            <Iframe
              className="rounded-lg"
              url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60415.23562680683!2d91.81060227219949!3d22.364597498714744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad270e1868679b%3A0x2a77aa3a90d79a6e!2sK.B.%20Aman%20Ali%20Rd%2C%20Chittagong!5e0!3m2!1sen!2sbd!4v1695490742808!5m2!1sen!2sbd"
              width="100%"
              height="450"
              frameborder="0"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"></Iframe>
          </div>
          <div className="flex-1">
            <form
              onSubmit={handleSubmit}
              className="w-full border-2 rounded-lg border-[#3b82f6] p-5">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-white font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-white font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none h-32 resize-none"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

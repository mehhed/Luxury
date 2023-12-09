import useAuth from "../hooks/useAuth";
import { FaBuilding, FaDollarSign, FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";

const AgentProfile = () => {
  const { currentUser } = useAuth();
  const [isAdmin] = useAdmin();

  const axiosSecure = useAxiosSecure();
  // get my added properties data by email
  const { data: myPropertes = [] } = useQuery({
    queryKey: ["myPropertes", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allPropertes?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  //  get requst data to database
  const { data: requstData = [] } = useQuery({
    queryKey: [currentUser?.email, "requstData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`requstData/${currentUser?.email}`);
      return res.data;
    },
  });

  // get sold data

  const { data: soldProduct = [] } = useQuery({
    queryKey: [currentUser?.email, "soldProduct"],
    queryFn: async () => {
      const res = await axiosSecure.get(`soldProduct/${currentUser?.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h1 className="text-3xl font-semibold">
        {" "}
        Hi, {currentUser?.displayName}
      </h1>
      <div className="my-5 bg-[#fef9c3] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black">
            <FaBuilding className="text-3xl"></FaBuilding>
          </div>
          <div className="stat-title">Total Propertes</div>
          <div className="stat-value">{myPropertes.length}</div>
        </div>
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total requst</div>
          <div className="stat-value">{requstData.length}</div>
        </div>
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total sold</div>
          <div className="stat-value">{soldProduct.length}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-center mt-3">
        <div className="border-r-[#D1A054] border-r-2 bg-[#FFEDD5] flex-1 w-full flex justify-center flex-col items-center py-10">
          <img
            className="w-[200px] h-[200px] rounded-full"
            src={`${currentUser?.photoURL}`}
            alt=""
          />
          <h1 className="text-3xl mt-3 text-center font-semibold">
            {currentUser?.displayName}
          </h1>
        </div>
        <div className="p-5 h-full bg-[#FEF9C3]">
          <h1 className="text-3xl text-center font-semibold ">
            Your Activities
          </h1>
          <div className="text-lg mt-auto space-y-3">
            <p>Name : {currentUser?.displayName} </p>
            <p>Email : {currentUser?.email} </p>
            <p>Phone : {currentUser?.phoneNumber} </p>
            <p>Role : {isAdmin}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;

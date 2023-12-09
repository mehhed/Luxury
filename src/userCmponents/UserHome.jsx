import useAuth from "../hooks/useAuth.jsx";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
import useAdmin from "../hooks/useAdmin.jsx";

const UserHome = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const [isAdmin] = useAdmin();

  const { data: allWishList = [] } = useQuery({
    queryKey: ["allComment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist/${currentUser?.email}`);
      return res.data;
    },
  });

  const { data: myBuyData = [] } = useQuery({
    queryKey: ["myBuyData"],
    queryFn: async () => {
      const res = await axiosSecure.get(`myBuy/${currentUser?.email}`);
      return res.data;
    },
  });

  const { data: allreviws = [] } = useQuery({
    queryKey: ["allCommen"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allComment/${currentUser?.email}`);
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
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total WishList</div>
          <div className="stat-value">{allWishList.length}</div>
        </div>
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total Buy</div>
          <div className="stat-value">{myBuyData.length}</div>
        </div>
        {/* card */}
        <div className="stat bg-[#ffedd5] rounded-lg">
          <div className="stat-figure text-black"></div>
          <div className="stat-title">Total Reviw</div>
          <div className="stat-value">{allreviws.length}</div>
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
          <h1 className="text-3xl text-center font-semibold mb-5">
            <span className="border-b-2 py-2 "> Your Activities</span>
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

export default UserHome;
<h1> hello i am mehedi </h1>;

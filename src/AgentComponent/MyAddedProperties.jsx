import { MdVerified } from "react-icons/md";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { ImBlocked } from "react-icons/im";
import { FcProcess } from "react-icons/fc";
import { Link } from "react-router-dom";

const MyAddedProperties = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  // get my added properties data by email
  const { data: myPropertes = [], refetch } = useQuery({
    queryKey: ["cart", currentUser?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/allPropertes?email=${currentUser?.email}`
      );
      return res.data;
    },
  });

  //  handle delet
  const handleDelete = (properties) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/allPropertes/${properties?._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your items has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-3">My added Propertie</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {myPropertes.map((onedata) => (
          <div className="h-full" key={onedata._id}>
            <div className="shadow-slate-500 h-full flex flex-col  rounded-lg p-5 shadow-inner">
              <img
                className="w-full max-h-[176px]"
                src={onedata?.PropertieImage}
                alt=""
              />
              <div>
                <p className="text-2xl font-semibold">
                  {onedata?.PropertieTitle}{" "}
                </p>
                <p>{onedata?.location}</p>
                <p>
                  price range : {onedata?.minPrice}$ - {onedata?.maxPrice}$
                </p>
              </div>
              <div className="flex flex-1 justify-between items-center">
                <div className="my-2 flex gap-2 items-center">
                  <div className="">
                    <img
                      className="w-16 rounded-full"
                      src={onedata?.agenImage}
                    />
                  </div>
                  <div>{onedata?.agentName}</div>
                </div>
                <div>
                  {onedata?.status == "verifyed" && (
                    <p className="text-blue-600 text-3xl">
                      <MdVerified />
                    </p>
                  )}
                  {onedata?.status == "rejected" && (
                    <p className="text-red-600 text-3xl">
                      <ImBlocked />
                    </p>
                  )}
                  {onedata?.status == "pending" && (
                    <p className="text-blue-700 text-3xl">
                      <FcProcess />
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-center gap-5 items-center">
                <Link to={`/Dashboard/update/${onedata._id}`}>
                  <button className="btn">Update</button>
                </Link>
                <button
                  className="btn btn-error"
                  onClick={() => handleDelete(onedata)}>
                  delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedProperties;

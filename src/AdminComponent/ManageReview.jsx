import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const ManageReview = () => {
  const axiosSecure = useAxiosSecure();
  //  get reviws  data
  const { data: allreviws = [], refetch } = useQuery({
    queryKey: ["allComment"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allComment`);
      return res.data;
    },
  });

  // delete reviws
  const handaleDelete = (user) => {
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
        axiosSecure.delete(`/deleteRevew/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold capitalize mb-3">all reviews </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {allreviws.map((oenReviw) => (
          <div
            key={oenReviw._id}
            className="shadow-slate-500  rounded-lg p-5 shadow-inner">
            <div className="flex justify-between items-center">
              <div className="my-2 flex gap-2 items-center">
                <div className="">
                  <img
                    className="w-16 rounded-full"
                    src={oenReviw?.reviwerImage}
                  />
                </div>
                <div>
                  <p className="text-lg">{oenReviw.reviwerName}</p>
                  <p className="text-[12px] -mt-2">{oenReviw?.reviwerEmail}</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="text-lg text-gray-700 my-2">
              {oenReviw?.commetContent}
            </div>
            <hr />
            <div className="flex justify-center gap-5 items-center mt-2">
              <button
                className="btn btn-error"
                onClick={() => handaleDelete(oenReviw)}>
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReview;

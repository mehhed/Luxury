import React, { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AdvertisementManage = () => {
  const axionSecure = useAxiosSecure();
  const axionPublic = useAxiosPublic();

  const [Ads, setAds] = useState([]);

  const { data: advertisement = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axionSecure.get("/advertisement");
      return res.data;
    },
  });

  useEffect(() => {
    axionPublic("advartise").then((res) => {
      const findTotalAds = res.data.filter((one) => (one.advartise = true));
      setAds(findTotalAds);
    });
  }, [advertisement, axionPublic]);

  //  add advertisement
  const handleAdvertisement = (properties) => {
    if (Ads.length >= 6) {
      return Swal.fire({
        title: "Error!",
        text: "you can not provaide Ads getterthen 6 items",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    axionSecure.patch(`/advertise/${properties._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${properties.PropertieTitle} is an advertise Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  //  remov advertisement
  const handleRemovAdvertisement = (properties) => {
    axionSecure.patch(`/advertiseRemov/${properties._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Ads removed successfull`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-semibold">Advertise any properties</h1>
      <div className="overflow-x-auto">
        <table className="table rounded-none mt-3 table-zebra bg-[#FFEDD5]">
          {/* head */}
          <thead className="text-lg capitalize">
            <tr>
              <th>property title</th>
              <th>location</th>
              <th>agent email</th>
              <th>agent name</th>
              <th> price range</th>
              <th>Advertise</th>
              <th>Remove Advertise</th>
            </tr>
          </thead>
          <tbody>
            {advertisement.map((oneData) => (
              <tr key={oneData._id}>
                <td> {oneData?.PropertieTitle}</td>
                <td> {oneData?.location}</td>
                <td> {oneData?.agentEmail}</td>
                <td> {oneData?.agentName}</td>
                <td>
                  {oneData?.maxPrice}$ - {oneData?.minPrice}$
                </td>
                <td>
                  <button
                    onClick={() => handleAdvertisement(oneData)}
                    disabled={oneData.advartise == true && true}
                    className="btn btn-success">
                    Advertise
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleRemovAdvertisement(oneData)}
                    disabled={oneData.advartise == true ? false : true}
                    className="btn btn-error">
                    Remov
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdvertisementManage;

import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className=" p-10">
        <div>
          <Link
            to={"/"}
            className="capitalize btn btn-outline hover:bg-[#b44200]">
            ⬅️ Go back
          </Link>
        </div>
        <img
          src="https://raw.githubusercontent.com/mehhed/assignment-img/main/a8121abee959e18cbad25ad4046f76d8.gif"
          alt=""
          className="max-w-[1000px] mx-auto"
        />
      </div>
    </div>
  );
};

export default ErrorPage;

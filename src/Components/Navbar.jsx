import { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import { AuthContext } from "../Authentication/Authentication";
import useAdmin from "../hooks/useAdmin";

const Navbar = () => {
  const [navbar, setnavbar] = useState(false);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const { currentUser, signOutuser, setUser } = useContext(AuthContext);

  const signOutUses = () => {
    signOutuser()
      .then(() => {
        console.log("// Sign-out successful.");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <div className="sticky top-0 py-4  shadow-inner shadow-slate-300 px-5  z-50">
        <div className="flex justify-between items-center h-full w-full">
          {/* site name and logo */}
          <div className=" text-2xl md:text-3xl flex-1 flex gap-5 items-center">
            <img
              src="https://raw.githubusercontent.com/mehhed/assignment-eleven-image/main/Blue%20Illustrative%20Luxury%20Real%20Estate%20Logo%20(1).png"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <h1>Luxury</h1>
          </div>
          {/* navigation menu  */}
          <div
            onClick={() => {
              setnavbar(!navbar);
            }}
            className="lg:hidden cursor-pointer text-2xl flex justify-end flex-1 ">
            {navbar ? <AiOutlineClose /> : <HiOutlineMenu />}
          </div>
          <div
            className={`lg:flex  flex-1 ${
              navbar ? "block" : "hidden"
            } absolute lg:static top-full left-0 w-full bg-white px-5 lg:bg-transparent justify-end z-40`}>
            <ul className="flex flex-col lg:flex-row lg:justify-end justify-start gap-x-5 lg:items-center font-bold">
              <li className="lg:my-1 my-1">
                <NavLink
                  onClick={() => {
                    setnavbar(!navbar);
                  }}
                  to={`/`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-[#15fffd]"
                      : isPending
                      ? "pending"
                      : "block lg:inline-block"
                  }>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  onClick={() => {
                    setnavbar(!navbar);
                  }}
                  to={`/allProperties`}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "active text-[#15fffd]"
                      : isPending
                      ? "pending"
                      : ""
                  }>
                  All properties
                </NavLink>
              </li>

              {/* for admin */}
              {isAdmin == "admin" && (
                <li className="lg:my-1 my-1">
                  <NavLink
                    onClick={() => {
                      setnavbar(!navbar);
                    }}
                    to={`/Dashboard/adminProfile`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active text-[#15fffd]"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {/* for agent */}
              {isAdmin == "agent" && (
                <li className="lg:my-1 my-1">
                  <NavLink
                    onClick={() => {
                      setnavbar(!navbar);
                    }}
                    to={`/Dashboard/Profile`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active text-[#15fffd]"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {/* for user */}
              {isAdmin == "user" && (
                <li className="lg:my-1 my-1">
                  <NavLink
                    onClick={() => {
                      setnavbar(!navbar);
                    }}
                    to={`/Dashboard/UserHome`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active text-[#15fffd]"
                        : isPending
                        ? "pending"
                        : ""
                    }>
                    Dashboard
                  </NavLink>
                </li>
              )}
              {/*  log in log out toggle  */}
              {currentUser ? (
                <li>
                  <span className="btn" onClick={signOutUses}>
                    sign out
                  </span>
                </li>
              ) : (
                <li>
                  <Link
                    to={"/logIn"}
                    onClick={() => {
                      setnavbar(!navbar);
                    }}>
                    <button className="btn"> Log In</button>
                  </Link>
                </li>
              )}
              {currentUser && (
                <li>
                  <div className="flex items-center gap-3">
                    <li>{currentUser?.displayName}</li>
                    <div className="dropdown lg:dropdown-bottom lg:dropdown-end dropdown-center">
                      <label tabIndex={0} className="btn-circle text-2xl">
                        <img
                          src={currentUser?.photoURL}
                          alt=""
                          className="h-9 w-9 rounded-full"
                        />
                      </label>
                    </div>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

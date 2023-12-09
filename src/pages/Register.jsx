import React, { useContext, useState } from "react";
import { AuthContext } from "../Authentication/Authentication";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import app from "../firebase.config";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
  // for post user data to database
  const axiosPublic = useAxiosPublic();

  const { signUP, setUser, currentUser } = useContext(AuthContext);
  const [passwordError, setError] = useState("");
  const auth = getAuth(app);
  const navigate = useNavigate();

  const specialCharacterRegex = /[!@#\$%\^&\*\(\)_\+{}\[\]:;<>,.?~\\]/;
  const uppercaseRegex = /[A-Z]/;
  const signUpNewUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    if (password.length < 6) {
      setError("password must be 6 character");
      return;
    } else if (!uppercaseRegex.test(password)) {
      setError("password must be have a capital letter");
      return;
    } else if (!specialCharacterRegex.test(password)) {
      setError("password must be have a special letter");
      return;
    } else {
      signUP(email, password)
        .then((userCredential) => {
          // Signed in
          navigate("/login");
          Swal.fire("Good job!", "aceount createed successfull", "success");
          // post data
          axiosPublic.post("/users", { name, email, role: "user" });
          // update profile
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
          });
          setUser(null);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          Swal.fire("opps...", "email allready use", "error");
        });
    }
  };
  return (
    <div>
      <Helmet>
        <title>ecoFood | Regester</title>
      </Helmet>
      <div className="h-full flex justify-center items-center">
        <div>
          <div className="hero">
            <div className="hero-content">
              <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                  <form action="" onSubmit={signUpNewUser}>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Name</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className="input input-bordered"
                        name="name"></input>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">photo URL</span>
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="photo URL"
                        className="input input-bordered"
                        name="photo"></input>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text " id="allreadyHave">
                          Email
                        </span>
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        placeholder="email"
                        className="input input-bordered"></input>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Password</span>
                      </label>
                      <input
                        required
                        type="password"
                        placeholder="password"
                        className="input input-bordered"
                        name="password"></input>
                      <span className="text-red-400">{passwordError}</span>
                    </div>
                    <div className="form-control mt-6">
                      <button className="btn btn-primary">Sign up</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

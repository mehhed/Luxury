import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Authentication/Authentication";
import { GoogleAuthProvider } from "firebase/auth"; // Import GoogleAuthProvider if you haven't already
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Login = () => {
  const AxionPublic = useAxiosPublic();

  const navigate = useNavigate();
  const location = useLocation();
  const { signin, signUpByGoogle, setUser } = useContext(AuthContext);

  const loginUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // sign in by email password
    signin(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        setUser(user);
        Swal.fire("Good job!", "You log in sucessfull", "success");
        // post user in data base
        // ager page a niya jabe log in howar pore
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "invalid information",
        }); // Show an alert with the error message
      });
  };

  // sign in by google
  const loginWithGoogle = () => {
    signUpByGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        Swal.fire("Good job!", "Login with Google successful", "success");
        //  post in database
        AxionPublic.post("/users", {
          name: user?.displayName,
          email: user?.email,
          role: "user",
        });
        // ager page a niya jabe log in howar pore
        navigate(location.state ? location.state : "/");
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage);
        Swal.fire("opps...", "log in fail", "error"); // Show an alert with the error message
      });
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Helmet>
        <title>ecoFood | Login</title>
      </Helmet>
      <div>
        <div className="hero">
          <div className="hero-content">
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <form action="" onSubmit={loginUser}>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="email"
                      className="input input-bordered"
                      name="email"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      className="input input-bordered"
                    />
                    <label className="label flex justify-between">
                      <Link to="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </Link>
                      <Link
                        to={"/register"}
                        className="label-text-alt link link-hover">
                        Sign up
                      </Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                  </div>
                </form>
                <div className="flex justify-center items-center mt-3 gap-5">
                  <div className="h-[2px] bg-black bg-opacity-50 flex-grow"></div>
                  <span className="text-2xl">or</span>
                  <div className="h-[2px] bg-black flex-grow bg-opacity-50"></div>
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-circle " onClick={loginWithGoogle}>
                    <img
                      src="https://play-lh.googleusercontent.com/aFWiT2lTa9CYBpyPjfgfNHd0r5puwKRGj2rHpdPTNrz2N9LXgN_MbLjePd1OTc0E8Rl1=w240-h480-rw"
                      alt=""
                      className="w-12 h-12"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

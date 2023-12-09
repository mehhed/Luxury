import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const [isAdmin] = useAdmin();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center  text-5xl">
        <progress className="loading loading-infinity loading-lg "></progress>
      </div>
    );
  }
  if (currentUser && isAdmin == "admin") {
    return children;
  }
  if (!currentUser && isAdmin !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
};

export default AdminRoute;

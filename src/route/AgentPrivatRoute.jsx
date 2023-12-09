import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const AgentPrivatRoute = ({ children }) => {
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
  if (!currentUser && isAdmin !== "agent") {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }
  if (currentUser && isAdmin == "agent") {
    return children;
  }
};

export default AgentPrivatRoute;

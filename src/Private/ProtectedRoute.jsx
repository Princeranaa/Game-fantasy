import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loadingss from "../Pages/Loadingss";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loadingss/>

  if (!user) return <Navigate to="/login" />;

  return <Outlet/>;
};

export default ProtectedRoute;

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

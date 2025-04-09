import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserDataContext);
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, login } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login();
    }
  }, []);

  return isAuthenticated ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;

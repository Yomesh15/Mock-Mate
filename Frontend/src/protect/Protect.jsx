import { Navigate } from "react-router-dom";

const Protect = ({ children }) => {
  const token = localStorage.getItem("user");

  return token ? children : <Navigate to="/auth" replace />;
};

export default Protect;
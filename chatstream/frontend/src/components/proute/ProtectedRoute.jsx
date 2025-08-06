import { Navigate } from "react-router-dom";
import useTokenStore from "../../store/useAuthStore";

const ProtectedRoute = ({ children }) => {
  const token = useTokenStore((state) => state.token);
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

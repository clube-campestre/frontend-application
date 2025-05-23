import { Navigate } from "react-router-dom";
import { getToken } from "./authStorage";

const isAuthenticated = () => {
	return getToken() !== null;
};

const ProtectedRoute = ({ children }) => {
	if (!isAuthenticated()) {
		return <Navigate to="/login" replace />;
	}

	return children;
};

export default ProtectedRoute;

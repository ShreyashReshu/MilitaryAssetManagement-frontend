import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { role } = useContext(AuthContext);

    if (!role) return <Navigate to="/" />;
    
    // If allowedRoles is defined, check if user has permission
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <div className="p-5 text-center"><h1>⛔ 403 Unauthorized</h1><p>You do not have permission to view this page.</p></div>;
    }

    return children;
};

export default ProtectedRoute;
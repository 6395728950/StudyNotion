import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const { user } = useSelector((state) => state.auth); // Get user authentication state

    if (!user) {
        return <Navigate to="/login" replace />; // Redirect if not logged in
    }

    return <Outlet />; // Allow access to protected routes
};

export default PrivateRoute;

import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

function ProtectedRoute() {
    const { user, loading } = useSelector((state: RootState) => state.auth);

    if (loading) return <Loader />;

    return user ? <Outlet /> : <Navigate to="/auth/login" />;
}

export default ProtectedRoute; 
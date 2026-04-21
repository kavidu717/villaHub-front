import { useAuth } from "../../Context/auth-context";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const { user, loading } = useAuth();

    if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

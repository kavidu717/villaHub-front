import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/auth-context";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  // Only allow if user is logged in AND is an admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
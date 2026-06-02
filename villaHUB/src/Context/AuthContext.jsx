import { useEffect, useState } from "react";
import API from "../api/axios";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔐 Auto login check
    useEffect(() => {
        const verifyUser = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await API.get("/auth/profile");
                setUser(data.data);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        verifyUser();
    }, []);

    // 🔑 Normal Login
    const login = async (email, password) => {
        const { data } = await API.post("/auth/login", {
            email,
            password,
        });

        localStorage.setItem("token", data.token);
        setUser(data.user);

        return data;
    };

    // 🌐 Google Login (NEW)
    const googleLogin = async (credential) => {
        const { data } = await API.post("/auth/google", {
            credential,
        });

        localStorage.setItem("token", data.token);
        setUser(data.user);

        return data;
    };

    // 🚪 Logout
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                googleLogin, // ✅ added
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
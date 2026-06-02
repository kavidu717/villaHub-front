import { useEffect, useState } from "react";
import api from "../api/axios"; // 👈 your custom axios file
import { FaUser, FaEnvelope, FaPen } from "react-icons/fa";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 1. Polished Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
        <p className="mt-4 animate-pulse font-medium text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  // 2. Beautiful Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl text-red-500">
            !
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">Oops!</h2>
          <p className="text-slate-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        
        {/* Page Header */}
        <h1 className="mb-8 text-3xl font-extrabold text-slate-900 tracking-tight">
          Account Profile
        </h1>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          
          {/* Cover Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 sm:h-40"></div>

          <div className="px-6 pb-10 sm:px-10">
            {/* Avatar & Edit Button Row */}
            <div className="relative -mt-16 mb-8 flex items-end justify-between sm:-mt-20">
              
              {/* Dynamic Avatar (Uses first letter of user's name) */}
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md sm:h-40 sm:w-40">
                <span className="text-5xl font-bold text-blue-600 sm:text-6xl uppercase">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>

              <button className="mb-2 flex items-center gap-2 rounded-xl bg-slate-50 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-100 active:scale-95 transition-all">
                <FaPen className="text-xs text-slate-400" />
                Edit Profile
              </button>
            </div>

            {/* Profile Intro */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500">Manage your personal information and settings.</p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              
              {/* Name Box */}
              <div className="flex items-center rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-blue-600">
                  <FaUser className="text-lg" />
                </div>
                <div className="ml-4">
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Full Name
                  </p>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                </div>
              </div>

              {/* Email Box */}
              <div className="flex items-center rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-blue-600">
                  <FaEnvelope className="text-lg" />
                </div>
                <div className="ml-4 truncate">
                  <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Email Address
                  </p>
                  <p className="font-semibold text-slate-900 truncate">{user.email}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
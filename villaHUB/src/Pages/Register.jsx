import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/auth-context";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi"; // ✅ Imported Icons

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  // 🧾 Normal Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await API.post("/auth/register", formData);
      toast.success(res.data.message || "Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  // 🌐 Google Login
  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success("Welcome to VillaHub!");
      navigate("/");
    } catch (err) {
      toast.error("Google Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      
      {/* Main Container */}
      <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 lg:flex-row">

        {/* Left Side: Image Banner */}
        <div className="relative hidden w-full lg:block lg:w-5/12">
          <img
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1777525745/kelsey-curtis--27u_GzlAFw-unsplash_k3v8rr.jpg"
            alt="Luxury Villa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-10 text-white">
            <h2 className="text-3xl font-bold tracking-tight">Your perfect getaway awaits.</h2>
            <p className="mt-3 text-blue-100">Join thousands of travelers finding their dream vacation homes every day.</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex w-full flex-col justify-center p-8 sm:p-12 lg:w-7/12 lg:p-16">
          
          <div className="mb-10 text-center lg:text-left">
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-600">
              Join VillaHub
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Create an Account
            </h1>
            <p className="mt-2 text-slate-500">
              Sign up to start booking your luxury stays.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input with Icon */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiUser className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email Input with Icon */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiMail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="hello@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Input with Icon */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <FiLock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 transition-all outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600/20"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              disabled={isLoading}
              className={`group mt-4 flex w-full items-center justify-center rounded-xl py-4 text-base font-bold text-white shadow-sm transition-all active:scale-[0.98] ${
                isLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
              }`}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  Create Account
                  <FiArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
              theme="outline"
              size="large"
              shape="pill"
            />
          </div>

          {/* LOGIN LINK */}
          <p className="mt-10 text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-blue-600 transition-colors hover:text-blue-700 hover:underline"
            >
              Sign in here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
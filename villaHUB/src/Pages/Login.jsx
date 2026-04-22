import { useState } from "react";
import { useAuth } from "../Context/auth-context";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// React Icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { HiArrowLongRight } from "react-icons/hi2";
// Asset Import


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      toast.success("Welcome back to StayEase!");
      navigate(data.user?.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center bg-slate-50/50 py-15 px-4">
      <div className="mx-auto grid max-w-9xl gap-0 overflow-hidden  bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[1fr_1.1fr]">
        
        {/* Left Side: Visual Image */}
        <div className="relative hidden lg:block ">
          <img 
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1776772174/sara-dubler-Koei_7yYtIo-unsplash_ukfd06.jpg"
            alt="Luxury Villa" 
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-110"
          />
          {/* Subtle Overlay for branding */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-4xl font-bold text-white leading-tight">
              Discover your <br /> <span className="text-primary text-yellow-400">perfect escape.</span>
            </h2>
            <p className="mt-4 text-slate-200 max-w-sm">
              Log in to access exclusive rates and manage your upcoming stays at the world's most beautiful villas.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <form onSubmit={handleSubmit} className="p-8 sm:p-12 md:p-16">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-bold uppercase tracking-widest mb-4">
               <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
               <span>Member Access</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Sign In</h1>
            <p className="mt-3 text-slate-500 font-medium italic">Welcome back to StayEase.</p>
          </div>

          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2.5">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-teal-600">
                  <MdEmail size={22} className="text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-12 py-4 outline-none transition-all focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 placeholder:text-slate-400"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link to="/forgot-password" size="sm" className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
                    Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-teal-600">
                  <RiLockPasswordFill size={22} className="text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-12 py-4 outline-none transition-all focus:bg-white focus:border-teal-600 focus:ring-4 focus:ring-teal-500/10 placeholder:text-slate-400"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button className="group flex w-full items-center justify-center space-x-3 rounded-2xl bg-slate-900 py-4.5 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] py-4">
              <span>Secure Login</span>
              <HiArrowLongRight className="text-xl group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New to our platform?{" "}
              <Link to="/register" className="font-bold text-teal-600 hover:text-teal-700 hover:underline decoration-2 underline-offset-8 transition-all">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

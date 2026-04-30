import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios";

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 px-4 py-12">
      {/* 
          Max-w-6xl makes the whole component wide ("mahath").
          The grid-cols-[1fr_1.2fr] makes the form side slightly wider than the image.
      */}
      <div className="mx-auto grid max-w-6xl w-full grid-cols-1 overflow-hidden  bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[1fr_1.2fr]">
        
        {/* The Image Side */}
        <div className="relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1777525745/kelsey-curtis--27u_GzlAFw-unsplash_k3v8rr.jpg"
            alt="Villa"
            className="h-full w-full object-cover"
          />
          {/* Subtle overlay to blend with the brand */}
          <div className="absolute inset-0 bg-teal-900/10" />
        </div>

        {/* The Form Side - "Spread out" with large padding */}
        <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20">
          <div className="mb-10 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Join VillaHub</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Create Account
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 ml-1">Full name</span>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full  border-none bg-slate-100/80 px-6 py-4 text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 ml-1">Email address</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full  border-none bg-slate-100/80 px-6 py-4 text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-slate-700 ml-1">Password</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full  border-none bg-slate-100/80 px-6 py-4 text-slate-900 outline-none transition-all focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </label>
            </div>

            <button className="w-full rounded-2xl bg-[#f0c733] py-5 text-lg font-bold text-white shadow-xl shadow-slate-200 transition-all hover:bg-slate-800 active:scale-[0.99]">
              Register Account
            </button>
          </form>

          <div className="mt-10 border-t border-slate-100 pt-8 text-center">
            <p className="text-slate-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-teal-600 hover:text-teal-700">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../Context/auth-context";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { googleLogin } = useAuth();

  // 🧾 Normal Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  // 🌐 Google Login
  const handleGoogleSuccess = async (response) => {
    try {
      await googleLogin(response.credential);
      toast.success("Google Login Success");
      navigate("/");
    } catch (err) {

      toast.error("Google Login Failed");
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 px-4 py-12">
      <div className="mx-auto grid max-w-6xl w-full grid-cols-1 overflow-hidden bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[1fr_1.2fr]">

        {/* Image */}
        <div className="relative hidden lg:block">
          <img
            src="https://res.cloudinary.com/doujmzgn3/image/upload/v1777525745/kelsey-curtis--27u_GzlAFw-unsplash_k3v8rr.jpg"
            alt="Villa"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-teal-900/10" />
        </div>

        {/* Form */}
        <div className="flex flex-col justify-center p-10 md:p-16 lg:p-20">

          <div className="mb-10 text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
              Join VillaHub
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              Create Account
            </h1>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-slate-100 px-6 py-4"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-slate-100 px-6 py-4"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-slate-100 px-6 py-4"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button className="w-full rounded-2xl bg-[#f0c733] py-5 text-lg font-bold text-white">
              Register Account
            </button>
          </form>

          {/* OR */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>
            <span className="text-sm text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => toast.error("Google Login Failed")}
            />
          </div>

          {/* LOGIN LINK */}
          <div className="mt-10 border-t border-slate-100 pt-8 text-center">
            <p className="text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-bold text-teal-600 hover:text-teal-700"
              >
                Login here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
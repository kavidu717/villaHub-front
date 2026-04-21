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
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-teal-700">Create your account</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
            Start with a verified profile
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            Register with your name, email, and password. Your backend sends the verification link before login is allowed.
          </p>
          <div className="mt-8 rounded-xl bg-slate-50 p-5">
            <p className="text-sm font-medium text-slate-900">What happens next</p>
            <ul className="mt-3 space-y-3 text-sm text-slate-600">
              <li>Create your account</li>
              <li>Verify your email address</li>
              <li>Login and continue to booking features</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium text-teal-700">Join VillaHub</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Create Account</h1>
          <div className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                placeholder="Choose a password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </label>
            <button className="w-full rounded-lg bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
              Register
            </button>
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Already registered?{" "}
            <Link to="/login" className="font-medium text-teal-700 hover:text-teal-800">
              Login here
            </Link>
          </p>
        </form>
    </div>
  );
}

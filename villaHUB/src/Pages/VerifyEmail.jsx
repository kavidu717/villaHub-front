import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`/auth/verify/${token}`);
        toast.success(res.data.message);
        navigate("/login");
      } catch (err) {
        toast.error(err.response?.data?.message || "Verification failed");
      }
    };
    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-medium text-teal-700">Email verification</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
          Verifying your account
        </h1>
        <p className="mt-5 text-sm leading-7 text-slate-600">
          Please wait while we confirm your email token and activate your account.
        </p>
        <div className="mx-auto mt-8 h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600"></div>
      </div>
    </div>
  );
}

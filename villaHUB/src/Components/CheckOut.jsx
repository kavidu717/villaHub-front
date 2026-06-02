import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaUser,
  FaHotel,
  FaCreditCard,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaCalendarCheck,
  FaCalendarTimes
} from "react-icons/fa";
import API from "../api/axios.js";

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            ❌
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No Booking Found</h1>
          <p className="text-slate-500 mb-6">We couldn't locate the booking details for your checkout session.</p>
          <button
            onClick={() => navigate("/villas")}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Return to Villas
          </button>
        </div>
      </div>
    );
  }

  // ✅ STRIPE PAYMENT HANDLER
  const handlePay = async () => {
    try {
      setLoading(true);

      const response = await API.post("/payment/stripe", {
        orderId: booking._id,
        amount: booking.totalPrice,
      });

      // redirect to Stripe checkout page
      window.location.href = response.data.url;

    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Secure Checkout</h1>
        <p className="text-slate-500 mt-2">Complete your details below to finalize your reservation.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-slate-800">

        {/* LEFT - FORM (Takes up 7 columns on large screens) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <FaUser className="text-sm" />
              </div>
              Guest Information
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                  <input 
                    name="firstName" 
                    placeholder="John" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Last Name</label>
                  <input 
                    name="lastName" 
                    placeholder="Doe" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                  <input 
                    type="email"
                    name="email" 
                    placeholder="john@example.com" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone" 
                    placeholder="+1 (555) 000-0000" 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                <input 
                  name="city" 
                  placeholder="New York" 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Billing Address</label>
                <textarea 
                  name="address" 
                  placeholder="123 Main St, Apt 4B" 
                  rows="3"
                  onChange={handleChange} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white outline-none transition-all resize-none" 
                />
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT - SUMMARY (Takes up 5 columns, sticky on scroll) */}
        <div className="lg:col-span-5">
          {/* Sticky wrapper */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 lg:sticky lg:top-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                <FaHotel className="text-sm" />
              </div>
              Booking Summary
            </h2>

            {/* Property Details */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">{booking.villa?.name || booking.name || "Luxury Villa"}</h3>
              <p className="flex items-center gap-1.5 text-sm text-slate-500 mt-1">
                <FaMapMarkerAlt className="text-slate-400" /> {booking.villa?.location?.city || booking.location?.city || "Location details"}
              </p>
            </div>

            {/* Dates */}
            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <FaCalendarCheck className="text-blue-500" /> Check-in
                </div>
                <div className="font-semibold text-slate-900">
                  {new Date(booking.checkInDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <FaCalendarTimes className="text-slate-400" /> Check-out
                </div>
                <div className="font-semibold text-slate-900">
                  {new Date(booking.checkOutDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-slate-100 pt-6 mb-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Amount</p>
                  <p className="text-xs text-slate-400">Includes all taxes and fees</p>
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  LKR {booking.totalPrice?.toLocaleString()}
                </h1>
              </div>
            </div>

            {/* PAY BUTTON */}
            <button
              onClick={handlePay}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                loading 
                  ? "bg-blue-400 cursor-not-allowed text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <FaCreditCard className="text-lg" />
              )}
              {loading ? "Processing..." : "Confirm & Pay"}
            </button>

            {/* Trust Badge */}
            <div className="mt-5 flex items-center justify-center text-xs font-medium text-slate-500 gap-1.5 bg-slate-50 py-2 rounded-lg border border-slate-100">
              <FaShieldAlt className="text-emerald-500 text-sm" />
              Payments are securely processed by Stripe
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
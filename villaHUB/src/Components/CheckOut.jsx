import { useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { useState } from "react";
import { FaUser, FaHotel, FaCreditCard, FaMapMarkerAlt, FaShieldAlt } from "react-icons/fa";
import API from "../api/axios.js";

export default function CheckOut() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-6xl mb-4 animate-bounce">ðŸï¸</div>
        <h1 className="text-2xl font-bold text-gray-800">No booking found âŒ</h1>
        <button 
          onClick={() => navigate('/villas')}
          className="mt-4 text-blue-600 hover:underline font-semibold"
        >
          Return to Villas
        </button>
      </div>
    );
  }

  const handlePay = async () => {
    try {
      const orderId = booking._id; 
      console.log("ORDER ID SENT:", orderId);
      const amount = booking.totalPrice;
      const currency = "LKR";

      const response = await API.post("/payment/payhere", {
        orderId: orderId,
        amount: amount
      });

      const { hash } = response.data;

      const payment = {
        sandbox: true,
        merchant_id:1235222,
        order_id: orderId,
        items: booking.name || "Villa Booking",
        amount: parseFloat(amount).toFixed(2),
        currency: currency,
        hash: hash,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        country: "Sri Lanka",
        return_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/checkout",
        notify_url: "https://villahub.onrender.com/api/v1/payment/notify",
      };

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error("Payment initialization failed:", error);
      alert("Error generating payment hash. Check backend console.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex items-center gap-4">
          <div className="h-12 w-1 w-blue-600 bg-blue-600 rounded-full"></div>
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Final Step</h1>
            <p className="text-gray-500 font-medium">Review your stay and secure your booking.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT COLUMN - USER FORM */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-100/50 border border-white/60 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-800">
              <div className="p-2 bg-blue-50 rounded-lg">
                <FaUser className="text-blue-600" />
              </div>
              Guest Information
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">First Name</label>
                  <input name="firstName" placeholder="Kavidu" onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Last Name</label>
                  <input name="lastName" placeholder="Dushamantha" onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                <input name="email" type="email" placeholder="kavidu@example.com" onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Mobile Number</label>
                  <input name="phone" placeholder="071 234 5678" onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">City</label>
                  <input name="city" placeholder="Kelaniya" onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Billing Address</label>
                <textarea name="address" rows="2" placeholder="Your street address..." onChange={handleChange} className="w-full p-4 border-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-300" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - BOOKING SUMMARY */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-white/60 sticky top-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800">
                <div className="p-2 bg-green-50 rounded-lg">
                  <FaHotel className="text-green-600" />
                </div>
                Booking Summary
              </h2>

              <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-6 mb-8 text-white">
                <div className="relative z-10">
                  <h3 className="font-black text-2xl mb-1">{booking.name}</h3>
                  <p className="text-blue-400 flex items-center gap-2 font-semibold">
                    <FaMapMarkerAlt /> {booking.location?.city}
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 text-white/5 text-8xl rotate-12">
                  <FaHotel />
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">Check-in</span>
                  <span className="font-black text-gray-800">{new Date(booking.checkInDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                  <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">Check-out</span>
                  <span className="font-black text-gray-800">{new Date(booking.checkOutDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-end justify-between mb-8 px-2">
                <div>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em]">Grand Total</p>
                  <h1 className="text-5xl font-black text-gray-900 mt-1">
                    <span className="text-2xl text-blue-600 mr-1">$</span>
                    {booking.totalPrice}
                  </h1>
                </div>
                <div className="text-right">
                    <span className="text-[10px] bg-blue-100 text-blue-700 font-black px-2 py-1 rounded-md uppercase">LKR Equivalent</span>
                </div>
              </div>

              <button
                onClick={handlePay}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <FaCreditCard /> Confirm & Pay
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <FaShieldAlt className="text-green-500 text-sm" />
                100% Secure SSL Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

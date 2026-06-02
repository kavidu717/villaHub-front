import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { FaCalendarAlt, FaMapMarkerAlt, FaWallet, FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get("/booking/my-bookings");
        console.log("Fetched bookings:", res.data.data);
        setBookings(res.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCheckOut = (booking) => {
    navigate("/checkout", { state: { booking } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-75"></div>
        <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading your stays...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              My Bookings
            </h1>
            <p className="mt-2 text-slate-500 text-lg">
              Manage your upcoming stays and past experiences.
            </p>
          </div>

          <div className="inline-flex items-center justify-center bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm">
            <FaBed className="mr-2 text-blue-500" />
            {bookings.length} {bookings.length === 1 ? "Stay" : "Stays"} Booked
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 text-center border border-slate-200 flex flex-col items-center">
            <div className="bg-blue-50 p-6 rounded-full mb-6">
              <FaCalendarAlt size={48} className="text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">
              No bookings found
            </h3>
            <p className="text-slate-500 mt-3 max-w-md mx-auto text-lg">
              You haven't made any reservations yet. Time to pack your bags and find your next getaway!
            </p>

            <button
              onClick={() => navigate("/villas")}
              className="mt-8 px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 hover:shadow-md transition-all active:scale-95"
            >
              Explore Villas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">

                  {/* LEFT SIDE: Details */}
                  <div className="flex-1 p-6 sm:p-8">

                    {/* Villa Name + Status */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {b.villa?.name || "Luxury Villa"}
                        </h2>
                        <div className="flex items-center text-slate-500 mt-1.5">
                          <FaMapMarkerAlt className="mr-1.5 text-slate-400" />
                          <span className="text-sm font-medium">
                            {b.villa?.location?.city || "Unknown Location"}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          b.status === "confirmed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.status === "pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {b.status === "confirmed" ? "Confirmed & Paid" : b.status}
                      </span>
                    </div>

                    {/* Info Boxes (Dates + Price) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      
                      {/* Dates Box */}
                      <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-white p-3 rounded-xl text-blue-600 shadow-sm border border-slate-100">
                          <FaCalendarAlt className="text-lg" />
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            Stay Period
                          </p>
                          <p className="text-slate-800 font-semibold text-sm">
                            {new Date(b.checkInDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} 
                            {" "}—{" "}
                            {new Date(b.checkOutDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                      </div>

                      {/* Price Box */}
                      <div className="flex items-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <div className="bg-white p-3 rounded-xl text-emerald-600 shadow-sm border border-slate-100">
                          <FaWallet className="text-lg" />
                        </div>
                        <div className="ml-4">
                          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">
                            Total Payment
                          </p>
                          <p className="text-xl font-extrabold text-slate-900">
                            Rs. {b.totalPrice}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* RIGHT SIDE: Actions */}
                  <div className="bg-slate-50 p-6 sm:p-8 flex flex-row md:flex-col justify-center items-center gap-3 border-t md:border-t-0 md:border-l border-slate-200 md:w-56">
                    
                    <button
                      onClick={() => handleCheckOut(b)}
                      className="w-full px-5 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm hover:bg-blue-700 hover:shadow active:scale-95 transition-all"
                    >
                      Checkout
                    </button>

                    <button className="w-full px-5 py-3 bg-white text-red-600 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-50 active:scale-95 transition-all">
                      Cancel Stay
                    </button>

                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
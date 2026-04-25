import { useEffect, useState } from "react";
import API from "../api/axios.js";
import { FaCalendarAlt, FaMapMarkerAlt, FaWallet } from "react-icons/fa";
import {useNavigate } from "react-router-dom";

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
     


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

     const handleCheckOut =  (booking) => {
           navigate("/checkout", { state: { booking } });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">My Bookings</h1>
            <p className="mt-2 text-gray-600">Manage your upcoming stays and past experiences.  stay with us</p>
          </div>
          <div className="mt-4 md:mt-0 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
            {bookings.length} Total Bookings
          </div>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
            <div className="text-gray-400 mb-4">
              <FaCalendarAlt size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">No bookings found</h3>
            <p className="text-gray-500 mt-2">You haven't made any reservations yet.</p>
            <button 
              onClick={() => window.location.href = '/villas'}
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Explore Villas
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white group overflow-hidden rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  {/* Left: Content Info */}
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {b.name}
                        </h2>
                        <div className="flex items-center text-gray-500 mt-1">
                          <FaMapMarkerAlt className="mr-1 text-sm" />
                          <span className="text-sm uppercase tracking-wide font-medium">{b.location?.city}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                        b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                          <FaCalendarAlt />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Stay Period</p>
                          <p className="text-gray-800 font-medium">
                            {new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="bg-green-50 p-3 rounded-lg text-green-600">
                          <FaWallet />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase font-bold">Total Payment</p>
                          <p className="text-xl font-bold text-gray-900">${b.totalPrice}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right: Actions */}
                  <div className="bg-gray-50 p-6 flex md:flex-col justify-center items-center border-t md:border-t-0 md:border-l border-gray-100 space-x-4 md:space-x-0 md:space-y-3">
                    <button onClick={()=>{handleCheckOut(b)}} className="flex-1 md:w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-semibold bg-yellow-400 text-sm transition">
                      check out
                    </button>
                    <button className="flex-1 md:w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-semibold text-sm transition">
                      Cancel
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

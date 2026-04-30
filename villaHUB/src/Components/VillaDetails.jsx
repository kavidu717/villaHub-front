import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaUsers, FaBed, FaBath, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";


export default function VillaDetails() {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const res = await API.get(`/villa/${id}`);
        console.log("Fetched villa details:", res.data);
        const villaData = res.data.data
        setVilla(villaData);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch villa details:", err.response?.data || err.message);
        setError(err.response?.data?.message || "Could not load villa details");
        toast.error("Failed to load villa details");
      }
    };
    fetchVilla();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate("/villas")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Villas
          </button>
        </div>
      </div>
    );
  }

  if (!villa) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-xl font-medium text-gray-400">Loading your stay...</div>
      </div>
    );
  }

  const calculatePrice = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff * villa.pricePerNight : 0;
  };

  const handleBooking = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to book this villa");
      return;
    }
    if (!checkIn || !checkOut) return

    
    const bookingPayload = {
      villaId: villa._id,
      checkInDate: checkIn.toISOString(), // Convert to ISO string
      checkOutDate: checkOut.toISOString(), // Convert to ISO string
      totalPrice: calculatePrice(),
    };
    
    console.log("Sending booking:", bookingPayload);
    
    try {
      const res = await API.post("/booking", bookingPayload);

      console.log("Booking response:", res.data);
      navigate("/my-bookings");
      
      const bookingData = {
        ...villa,
        checkIn,
        checkOut,
        totalPrice: calculatePrice(),
      };

      toast.success("Villa booked successfully!");

      
    } catch (err) {
      console.error("Booking error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 pb-20">
      {/* HERO IMAGE SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="relative group overflow-hidden  shadow-2xl h-[400px] md:h-[550px]">
          <img
            src={villa?.photos?.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            alt="Villa"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-2 inline-block">
              Luxury Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold">{villa?.name}</h1>
          </div>
        </div>
      </div>

      {/* CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* LEFT COLUMN: INFO */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="text-lg">{villa?.location?.city}</span>
            </div>
            
            {/* AMENITIES BAR */}
            <div className="flex flex-wrap gap-6 border-y py-6 border-gray-200">
              <div className="flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                <span className="font-medium text-gray-700">{villa.maxGuests || 4} Guests</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBed className="text-blue-600" />
                <span className="font-medium text-gray-700">{villa.bedrooms || 2} Bedrooms</span>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-blue-600" />
                <span className="font-medium text-gray-700">{villa.bathrooms || 2} Bathrooms</span>
              </div>
            </div>
          </div>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About this villa</h2>
            <p className="text-gray-600 leading-relaxed text-lg italic">
              "{villa.description}"
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {['Private Pool', 'Free WiFi', 'Air Conditioning', 'Kitchen', 'Free Parking', 'Ocean View'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-gray-600">
                  <FaCheckCircle className="text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: STICKY BOOKING CARD */}
        <div className="relative">
          <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-black text-gray-800">Rs.{villa.pricePerNight}.00</span>
                <span className="text-gray-500 font-medium"> / night</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-in</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => setCheckIn(date)}
                  placeholderText="Add date"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer bg-gray-50 hover:bg-red"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-out</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  placeholderText="Add date"
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* PRICE CALCULATION BOX */}
            {calculatePrice() > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>${villa.pricePerNight} x {Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))} nights</span>
                  <span>${calculatePrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t">
                  <span>Total</span>
                  <span>${calculatePrice()}</span>
                </div>
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={!checkIn || !checkOut}
              className="w-full bg-yellow-500 text-black font-bold py-4 mt-8 shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reserve Now
            </button>
            <p className="text-center text-gray-400 text-xs mt-4 italic">You won't be charged yet</p>
          </div>
        </div>

      </div>
    </div>
  );
}

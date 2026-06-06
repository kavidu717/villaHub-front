import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaMapMarkerAlt, FaUsers, FaBed, FaBath, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function VillaDetails() {
  const { id } = useParams();
  const [villa, setVilla] = useState(null);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const navigate = useNavigate();

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0); 
    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);
    const date = new Date(start.getTime());
    const dates = [];

    while (date <= end) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  useEffect(() => {
    const fetchVilla = async () => {
      try {
        const res = await API.get(`/villa/${id}`);
        setVilla(res.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Could not load villa details");
        toast.error("Failed to load villa details");
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await API.get(`/booking/villa/${id}/bookings`);
        if (res.data.success) {
          let disabledDates = [];
          res.data.data.forEach((booking) => {
            const datesInRange = getDatesInRange(booking.checkInDate, booking.checkOutDate);
            disabledDates = [...disabledDates, ...datesInRange];
          });
          setBookedDates(disabledDates);
        }
      } catch (err) {
        console.error("Failed to fetch bookings:", err);
      }
    };

    fetchVilla();
    fetchBookings();
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
    if (!checkIn || !checkOut) return;

    const bookingPayload = {
      villaId: villa._id,
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
      totalPrice: calculatePrice(),
    };
    
    try {
      await API.post("/booking", bookingPayload);
      toast.success("Villa booked successfully!");
      navigate("/my-bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 pb-20">
      {/* HERO IMAGE SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <div className="relative group overflow-hidden shadow-2xl h-[400px] md:h-[550px]">
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

          {/* --- CSS STYLE BLOCK (ONLY AFFECTS THE BIG CALENDAR) --- */}
          <style>{`
            .modern-calendar-wrapper {
              background: linear-gradient(145deg, #ffffff, #f8fafc);
              box-shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
            }
            .modern-calendar-wrapper .react-datepicker {
              width: 100%;
              border: none;
              font-family: inherit;
              display: flex;
              justify-content: center;
              background: transparent;
            }
            .modern-calendar-wrapper .react-datepicker__month-container {
              width: 100%;
            }
            .modern-calendar-wrapper .react-datepicker__header {
              background-color: transparent;
              border-bottom: 2px dashed #e2e8f0;
              padding-top: 1.5rem;
              padding-bottom: 1rem;
            }
            .modern-calendar-wrapper .react-datepicker__current-month {
              font-size: 1.75rem;
              font-weight: 800;
              color: #1f2937;
              margin-bottom: 1rem;
            }
            .modern-calendar-wrapper .react-datepicker__day-name {
              color: #9ca3af;
              font-weight: 700;
              font-size: 0.875rem;
              text-transform: uppercase;
              width: 2.5rem;
              margin: 0.2rem;
            }
            .modern-calendar-wrapper .react-datepicker__day {
              width: 2.5rem;
              line-height: 2.5rem;
              font-size: 1.1rem;
              font-weight: 600;
              color: #374151;
              margin: 0.2rem;
              border-radius: 12px;
              transition: all 0.2s;
            }
            @media (min-width: 768px) {
              .modern-calendar-wrapper .react-datepicker__day-name, 
              .modern-calendar-wrapper .react-datepicker__day {
                width: 3.5rem;
                line-height: 3.5rem;
                font-size: 1.25rem;
                margin: 0.3rem;
              }
            }
            .modern-calendar-wrapper .react-datepicker__day:not(.react-datepicker__day--disabled):not(.react-datepicker__day--excluded):hover {
              background-color: #eff6ff;
              color: #2563eb;
              transform: scale(1.1);
            }
            .modern-calendar-wrapper .react-datepicker__day--today {
              background-color: #f3f4f6;
              border: 2px solid #d1d5db;
            }
            .modern-calendar-wrapper .react-datepicker__day--excluded {
              background-color: #fee2e2 !important;
              color: #ef4444 !important;
              text-decoration: line-through;
              text-decoration-thickness: 2px;
              opacity: 0.8 !important;
              cursor: not-allowed;
            }
            .modern-calendar-wrapper .react-datepicker__day--disabled:not(.react-datepicker__day--excluded) {
              color: #d1d5db;
              font-weight: 400;
            }
          `}</style>

          {/* --- BIG AVAILABILITY CALENDAR --- */}
          <div className="mt-12 pt-10 border-t border-gray-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Availability Calendar</h3>
            <div className="modern-calendar-wrapper rounded-3xl border border-gray-200 p-6 md:p-10 flex justify-center w-full">
              <DatePicker
                inline={true}
                readOnly={true}
                minDate={new Date()}
                excludeDates={bookedDates}
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: STICKY BOOKING CARD (ORIGINAL TAILWIND CODE) */}
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
                  minDate={new Date()}
                  excludeDates={bookedDates}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer bg-gray-50 hover:bg-red"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500 uppercase ml-1">Check-out</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  placeholderText="Add date"
                  minDate={checkIn || new Date()}
                  excludeDates={bookedDates}
                  className="w-full border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* PRICE CALCULATION BOX */}
            {calculatePrice() > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Rs.{villa.pricePerNight} x {Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24))} nights</span>
                  <span>Rs.{calculatePrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span>Rs.0</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t">
                  <span>Total</span>
                  <span>Rs.{calculatePrice()}</span>
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
            <p className="text-center text-gray-400 text-xs mt-4 italic mb-6">You won't be charged yet</p>
          </div>
        </div>

      </div>
    </div>
  );
}
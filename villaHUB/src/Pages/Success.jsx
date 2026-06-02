import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function Success() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const bookingId = searchParams.get("bookingId");

    if (bookingId) {
      API.put(`/payment/booking/${bookingId}/paid`)
        .then(() => {
          console.log("Booking confirmed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-green-600 mb-4">
        🎉 Payment Successful
      </h1>

      <p className="text-gray-600 mb-6">
        Your booking has been confirmed.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Go Home
      </button>
    </div>
  );
}
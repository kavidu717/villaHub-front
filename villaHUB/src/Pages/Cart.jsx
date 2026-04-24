import { useCart } from "../Context/useCart.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import API from "../api/axios.js";
import { FaTrash } from "react-icons/fa";

export default function Cart() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.totalPrice || 0), 0);
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      // Create bookings for each item in cart
      for (let booking of cart) {
        await API.post("/booking/confirm", {
          villaId: booking._id,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
          totalPrice: booking.totalPrice,
        });
      }

      toast.success("Booking confirmed! 🎉");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some villas to your cart to get started!</p>
          <button
            onClick={() => navigate("/villas")}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Villas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Your Bookings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((booking) => (
              <div key={booking._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Image */}
                  <div className="sm:w-40 h-40 flex-shrink-0">
                    <img
                      src={booking.photos?.url || "https://via.placeholder.com/300"}
                      alt={booking.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">{booking.name}</h3>
                    <p className="text-gray-600 mb-4">{booking.location?.city}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-gray-500 font-semibold">Check-in</p>
                        <p className="text-gray-800">{new Date(booking.checkIn).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-semibold">Check-out</p>
                        <p className="text-gray-800">{new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 font-semibold mb-1">Total Price</p>
                        <p className="text-3xl font-bold text-blue-600">${booking.totalPrice}</p>
                      </div>
                      <button className="text-red-500 hover:text-red-700 transition p-2">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary & Checkout */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Number of bookings</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service fee</span>
                  <span className="font-semibold">$0</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-800 mb-8">
                <span>Total</span>
                <span className="text-blue-600">${calculateTotal()}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-lg hover:bg-green-700 transition shadow-lg"
              >
                Complete Checkout
              </button>

              <button
                onClick={() => navigate("/villas")}
                className="w-full bg-gray-200 text-gray-800 font-bold py-3 mt-3 rounded-lg hover:bg-gray-300 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
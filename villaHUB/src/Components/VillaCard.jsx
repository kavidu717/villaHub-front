import { useNavigate } from "react-router-dom";

export default function VillaCard({ villa }) {

     const navigate=useNavigate();

  return (
    <div className="w-full sm:max-w-sm overflow-hidden shadow-lg bg-white rounded-xl mt-10">

      <img
        src={villa.photos?.url}
        alt={villa.name}
        className="w-full h-40 sm:h-52 object-cover hover:scale-110 transition duration-500"
      />

      <div className="p-3 sm:p-4 space-y-2 bg-blue-100">

        <h2 className="text-lg sm:text-xl font-semibold">{villa.name}</h2>

        <p className="text-gray-500 text-xs sm:text-sm">
          {villa.location?.city}
        </p>

        <div className="flex justify-between text-xs sm:text-sm text-gray-600 ">
          <span>👥 {villa.maxGuests}</span>
          <span>🛏 {villa.bedrooms}</span>
          <span>🛁 {villa.bathrooms}</span>
        </div>

        <div className="flex items-center justify-between pt-2 gap-2">
          <h3 className="text-base sm:text-lg font-bold text-blue-600">
            ${villa.pricePerNight}/night
          </h3>

          <button onClick={() => navigate(`/villa/${villa._id}`)} className="bg-green-600 text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-yellow-500 transition whitespace-nowrap">
            Get More
          </button>
        </div>

      </div>
    </div>
  );
}
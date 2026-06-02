import { useNavigate } from "react-router-dom";

export default function VillaCard({ villa }) {
  const navigate = useNavigate();

  return (
    <div 
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full cursor-pointer"
      onClick={() => navigate(`/villa/${villa._id}`)}
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-200">
        <img
          src={villa.photos?.url}
          alt={villa.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Subtle dark gradient at the bottom of the image for a premium feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        
        {/* Title & Location */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {villa.name}
          </h2>
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            📍 {villa.location?.city}
          </p>
        </div>

        {/* Amenities Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6 pb-4 border-b border-gray-100">
          <span className="flex items-center gap-1">👥 {villa.maxGuests}</span>
          <span className="flex items-center gap-1">🛏 {villa.bedrooms}</span>
          <span className="flex items-center gap-1">🛁 {villa.bathrooms}</span>
        </div>

        {/* Price & Action Button (Pushed to bottom naturally) */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-2xl font-extrabold text-blue-600">Rs.{villa.pricePerNight}</span>
            <span className="text-gray-500 text-sm font-medium"> / night</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents firing the card's onClick twice
              navigate(`/villa/${villa._id}`);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 active:scale-95 transition-all shadow-sm"
          >
            View
          </button>
        </div>

      </div>
    </div>
  );
}
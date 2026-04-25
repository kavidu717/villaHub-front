import { useNavigate } from "react-router-dom";

export default function VillaCard({ villa }) {
  const navigate = useNavigate();

  return (
    <div className="w-[280px]  overflow-hidden bg-white border border-slate-900 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 max-w-7xl mx-auto">

      {/* Image — takes up 3/4 of card height */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={villa.photos?.url}
          alt={villa.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 to-black/60" />

        {/* Featured badge */}
        <span className="absolute top-2.5 left-2.5 bg-amber-600 text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-full">
          ★ FEATURED
        </span>

        {/* Rating badge */}
        <span className="absolute top-2.5 right-2.5 bg-black/40 text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
          ★ {villa.rating ?? "4.9"}
        </span>

        {/* Title over image */}
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-white text-base font-semibold leading-tight">
            {villa.name}
          </h2>
          <p className="text-white/75 text-[11px] mt-0.5">
            📍 {villa.location?.city}
          </p>
        </div>
      </div>

      {/* Card body — compact info below */}
      <div className="p-3.5">

        {/* Amenities row */}
        <div className="flex bg-gray-50 rounded-lg overflow-hidden mb-3">
          {[
            { label: "Guests", value: villa.maxGuests },
            { label: "Beds",   value: villa.bedrooms },
            { label: "Baths",  value: villa.bathrooms },
          ].map((item, i) => (
            <div
              key={i}
              className="flex-1 text-center py-2.5 border-r border-gray-200 last:border-r-0"
            >
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">
                {item.label}
              </p>
              <p className="text-sm font-medium text-gray-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-400 tracking-wide mb-0.5">per night</p>
            <p className="text-xl font-semibold text-gray-900">
              ${villa.pricePerNight}
            </p>
          </div>

          <button
            onClick={() => navigate(`/villa/${villa._id}`)}
            className="bg-blue-600 hover:bg-amber-700 text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors duration-200 tracking-wide"
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
}
import { useState } from "react";
import VillaCard from "../Components/VillaCard";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function Villas() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    city: "",
    maxPrice: 2000, // Default starting value for range
    guests: "",
    hasWifi: false,
    hasPool: false,
    hasAC: false,
    isPetFriendly: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === "checkbox" ? checked : value
    });
  };

  return (
    <div className="mt-6 lg:mt-10 px-4 md:px-10">
      {/* MOBILE FILTER BUTTON */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full mb-4 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-medium"
      >
        {showFilters ? <FaTimes /> : <FaFilter />}
        {showFilters ? "Close Filters" : "Filter Search"}
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* FILTER SIDEBAR */}
        <div className={`
          ${showFilters ? "block" : "hidden"} 
          lg:block w-full lg:w-1/4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 h-fit sticky top-5
        `}>
          <div className="flex items-center gap-2 mb-6 border-b pb-4">
            <FaFilter className="text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Filters</h1>
          </div>

          {/* City */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleChange}
              placeholder="e.g. Colombo"
              className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Price Range Slider */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">Max Price</label>
              <span className="text-blue-600 font-bold">${filters.maxPrice}</span>
            </div>
            <input
              type="range"
              name="maxPrice"
              min="100"
              max="5000"
              step="50"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>$100</span>
              <span>$5000</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Amenities</p>
            <div className="space-y-3">
              {[
                { id: "hasWifi", label: "Wifi" },
                { id: "hasPool", label: "Pool" },
                { id: "hasAC", label: "Air Conditioning" },
                { id: "isPetFriendly", label: "Pet Friendly" },
              ].map((amenity) => (
                <label key={amenity.id} className="flex items-center gap-3 group cursor-pointer">
                  <input 
                    type="checkbox" 
                    name={amenity.id} 
                    onChange={handleChange}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-gray-600 group-hover:text-blue-600 transition-colors">{amenity.label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-200">
            Apply Filters
          </button>
        </div>

        {/* VILLA LIST */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Replace these with your dynamic mapping */}
            <VillaCard />
            <VillaCard />
            <VillaCard />
            <VillaCard />
            <VillaCard />
            <VillaCard />
          </div>
        </div>

      </div>
    </div>
  );
}
export default function VillaCard() {

  const villa = {
    name: "Ocean Breeze Villa",
    location: "Mirissa, Sri Lanka",
    price: 120,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
  };

  return (
    <div className="max-w-sm  overflow-hidden shadow-lg bg-white mt-5">
      
      <img
        src={villa.image}
        alt="villa"
        className="w-full h-52 object-cover"
      />

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{villa.name}</h2>
        <p className="text-gray-500 text-sm">{villa.location}</p>

        <div className="flex justify-between text-sm text-gray-600">
          <span>👥 {villa.maxGuests} Guests</span>
          <span>🛏 {villa.bedrooms}</span>
          <span>🛁 {villa.bathrooms}</span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <h3 className="text-lg font-bold text-blue-600">
            ${villa.price}/night
          </h3>

          <button className="bg-green-600 capitalize text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            get more
          </button>
        </div>
      </div>
    </div>
  );
}
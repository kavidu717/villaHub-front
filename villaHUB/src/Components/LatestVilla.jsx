import { useEffect, useState } from "react";
import API from "../api/axios";   // ✅ your axios instance
import VillaCard from "./VillaCard";

export default function LatestVillas() {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    API.get("/villa?limit=5")   // ✅ baseURL is automatically added
      .then((res) => setVillas(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
            Explore Our Latest Villas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            Discover the newest and most exclusive properties recently added to our collection.
          </p>
        </div>

        {/* Villa Grid */}
        {villas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {villas.map((villa) => (
              <VillaCard key={villa._id} villa={villa} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Loading latest villas...
          </div>
        )}
        
      </div>
    </section>
  );
}
import { useEffect, useState } from "react";
import API from "../api/axios.js";
import VillaCard from "../Components/VillaCard";
import { toast } from "react-hot-toast";

export default function Villas() {

  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVillas = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/villa");

      
      setVillas(res.data.data)
      
      console.log("Fetched villas:", res.data.data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching villas:", error.response?.data || error.message);
      setError(error.response?.data?.message || error.message || "Failed to load villas");
      setLoading(false);
      toast.error("Could not load villas. Please try again.");
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 sm:mt-10 text-sm sm:text-base">Loading villas...</p>;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchVillas}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-6 py-6 sm:py-8">

      {villas.length > 0 ? (
        villas.map((villa) => (
          <VillaCard key={villa._id} villa={villa} />
        ))
      ) : (
        <p className="text-center col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4 text-sm sm:text-base">No villas found</p>
      )}

    </div>
  );
}


import { useEffect, useState } from "react";
import API from "../api/axios";
import VillaCard from "../Components/VillaCard";

export default function Villas() {

  const [villas, setVillas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVillas = async () => {
    try {
      const res = await API.get("/villa");

      setVillas(res.data.data);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching villas:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVillas();
  }, []);

  if (loading) {
    return <p className="text-center mt-8 sm:mt-10 text-sm sm:text-base">Loading villas...</p>;
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
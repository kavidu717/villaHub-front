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
    return <p className="text-center mt-10">Loading villas...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 p-6 h-[500px] ">

      {villas.length > 0 ? (
        villas.map((villa) => (
          <VillaCard key={villa._id} villa={villa} />
        ))
      ) : (
        <p className="text-center col-span-3">No villas found</p>
      )}

    </div>
  );
}
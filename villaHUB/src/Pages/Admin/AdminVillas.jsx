import React, { useState, useEffect } from "react";
import API from "../../api/axios.js";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";

export default function AdminVillas() {
  const [villas, setVillas] = useState([]);

  useEffect(() => {
    fetchVilla();
  }, []);

  const fetchVilla = async () => {
    try {
      const res = await API.get('/villa');
      setVillas(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try{
      await API.delete(`/villa/${id}`);
       toast.success("Villa deleted successfully");

       // this is used to remove from the ui
      setVillas(villas.filter(villa => villa._id !== id));
    }
    catch(error){
      toast.error("Failed to delete villa");
      console.log(error);
    }
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Villa Name</th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Price Per Night</th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {villas.map((villa) => (
              <tr key={villa._id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-700">{villa.name}</td>
                <td className="px-6 py-4 text-slate-600">{villa.location.city}</td>
                <td className="px-6 py-4 font-bold text-teal-600">Rs {villa.pricePerNight}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2  text-md font-bold transition-all active:scale-95">
                      <MdModeEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(villa._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2  text-md font-bold transition-all active:scale-95"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {villas.length === 0 && (
          <div className="p-10 text-center text-slate-400 italic">
            No villas available to display.
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import API from "../../api/axios.js";
import { MdModeEdit, MdDelete } from "react-icons/md";
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
    if (!window.confirm("Are you sure you want to delete this villa?")) return;
    try {
      await API.delete(`/villa/${id}`);
      toast.success("Villa deleted successfully");
      setVillas(villas.filter(villa => villa._id !== id));
    } catch (error) {
      toast.error("Failed to delete villa");
      console.log(error);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Manage Villas</h1>
          <p className="text-slate-500 text-sm">View, edit, or remove villa listings from the platform.</p>
        </div>

        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Villa</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {villas.map((villa) => (
                <tr key={villa._id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={villa.photos.url} 
                        alt={villa.name} 
                        className="w-18 h-18 object-cover rounded-lg shadow-sm" 
                      />
                      <span className="font-semibold text-slate-700">{villa.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{villa.location.city}</td>
                  <td className="px-6 py-4 font-bold text-teal-600">Rs {villa.pricePerNight}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white p-2 rounded-lg transition-all active:scale-90">
                        <MdModeEdit size={20} />
                      </button>
                      <button 
                        onClick={() => handleDelete(villa._id)}
                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-all active:scale-90"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (Hidden on desktop) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {villas.map((villa) => (
            <div key={villa._id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex gap-4">
                <img 
                  src={villa.photos.url} 
                  alt={villa.name} 
                  className="w-20 h-20 object-cover rounded-xl" 
                />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{villa.name}</h3>
                  <p className="text-sm text-slate-500">{villa.location.city}</p>
                  <p className="text-teal-600 font-bold mt-1">Rs {villa.pricePerNight}</p>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-xl font-semibold text-sm">
                  <MdModeEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(villa._id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 py-2 rounded-xl font-semibold text-sm"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {villas.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No villas available to display.</p>
          </div>
        )}
      </div>
    </div>
  );
}
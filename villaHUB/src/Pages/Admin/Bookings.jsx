import { useEffect, useState } from "react";
import API from "../../api/axios.js";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    API.get("/booking/all-bookings")
      .then((res) => {
        setBookings(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Booking Management</h1>
            <p className="text-slate-500 text-sm">View and manage all incoming villa reservations.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-200">
            <span className="text-slate-500 text-sm font-medium">Total Bookings: </span>
            <span className="text-indigo-600 font-bold">{bookings.length}</span>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-xl shadow-slate-200/60 border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Colored Header */}
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">User Details</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Villa Name</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Check-in</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Check-out</th>
                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{b.user?.name || "Unknown Guest"}</span>
                        <span className="text-[10px] font-mono text-slate-400 mt-0.5 uppercase tracking-tighter">
                          ID: {b._id.slice(-8)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700 font-medium">{b.villa?.name || "N/A"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm">{b.checkInDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-600 text-sm">{b.checkOutDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize border
                        ${b.status === "confirmed" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : b.status === "pending" 
                          ? "bg-amber-50 text-amber-700 border-amber-100" 
                          : "bg-slate-50 text-slate-600 border-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          b.status === "confirmed" ? "bg-emerald-500" : 
                          b.status === "pending" ? "bg-amber-500" : "bg-slate-400"
                        }`}></span>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {bookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50">
              <div className="text-slate-300 mb-2">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">No reservations found in the system.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
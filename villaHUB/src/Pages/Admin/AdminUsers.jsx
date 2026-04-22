import API from "../../api/axios";
import React, { useState, useEffect } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get('/auth/admin/all');
      setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 bg-slate-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white  border border-slate-100 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-white">
            <tr className="text-[11px] uppercase tracking-widest font-bold">
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Email</th>
              <th className="px-8 py-5">Role</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-5">
                  <span className="font-bold text-slate-900">{user.name}</span>
                </td>
                <td className="px-8 py-5 text-sm text-slate-600 font-medium">
                  {user.email}
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    user.role === 'admin' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3">
                    <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-amber-500/20">
                      Block
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-red-500/20">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic font-medium">
            No registered users found.
          </div>
        )}
      </div>
    </div>
  );
}
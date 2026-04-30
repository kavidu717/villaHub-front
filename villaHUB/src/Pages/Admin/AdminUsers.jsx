import toast from "react-hot-toast";
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/auth/admin/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleBlock = async (id) => {
    try {
      const res = await API.patch(`/auth/admin/block/${id}`);
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
        )
      );
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (
    <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm">Manage access and roles for all registered members.</p>
        </div>

        {/* --- Desktop View (Table) --- */}
        <div className="hidden md:block overflow-hidden bg-white border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white">
              <tr className="text-[11px] uppercase tracking-[0.2em] font-bold">
                <th className="px-8 py-5">User Details</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{user.name}</span>
                      <span className="text-xs text-slate-500">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className={`h-2 w-2 rounded-full ${user.isBlocked ? 'bg-red-500' : 'bg-emerald-500'} inline-block mr-2`} />
                    <span className="text-xs font-medium text-slate-600">
                      {user.isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => handleBlock(user._id)} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95">
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Mobile View (Cards) --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {users.map((user) => (
            <div key={user._id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  user.role === 'admin' ? 'bg-teal-100 text-teal-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {user.role}
                </span>
              </div>
              
              <div className="flex items-center mb-6">
                 <span className={`text-xs font-bold px-2 py-0.5 rounded ${user.isBlocked ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {user.isBlocked ? 'Blocked' : 'Active Account'}
                </span>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => handleBlock(user._id)} 
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all active:scale-95 border-2 ${
                    user.isBlocked ? 'border-amber-500 text-amber-600' : 'border-slate-900 bg-slate-900 text-white'
                  }`}
                >
                  {user.isBlocked ? 'Unblock User' : 'Block User'}
                </button>
                <button 
                  onClick={() => handleDelete(user._id)} 
                  className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl text-xs font-bold border-2 border-transparent transition-all active:scale-95"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="py-20 text-center text-slate-400 italic bg-white rounded-2xl border border-dashed border-slate-300">
            No registered users found.
          </div>
        )}
      </div>
    </div>
  );
}
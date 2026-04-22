import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { HiMenu, HiOutlineHome, HiOutlineLogout, HiOutlineUsers, HiOutlineViewGrid, HiX } from "react-icons/hi";
import { useAuth } from "../Context/auth-context";

export default function AdminLayout() {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-slate-900/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className="hidden w-64 flex-col overflow-y-auto bg-slate-900 text-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex">
        <div className="p-8 text-2xl font-bold tracking-tighter">
          Stay<span className="text-primary">Ease</span>{" "}
          <span className="block text-xs uppercase tracking-widest text-slate-400">Admin</span>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <Link to="/admin" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineViewGrid size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/add-villa" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineUsers size={20} />
            <span className="font-medium">Add Villa</span>
          </Link>

          <Link to="/admin/villas" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineHome size={20} />
            <span className="font-medium">Manage Villas</span>
          </Link>
          <Link to="/admin/users" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineUsers size={20} />
            <span className="font-medium">User Accounts</span>
          </Link>

           
        </nav>

        <button
          onClick={logout}
          className="m-4 flex items-center space-x-3 rounded-xl bg-red-500/10 p-3 text-red-500 transition-all hover:bg-red-500 hover:text-white"
        >
          <HiOutlineLogout size={20} />
          <span className="font-bold">Exit Admin</span>
        </button>
      </aside>

      {isSidebarOpen && (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-y-auto bg-slate-900 text-white lg:hidden">
          <div className="p-8 text-2xl font-bold tracking-tighter">
            Stay<span className="text-primary">Ease</span>{" "}
            <span className="block text-xs uppercase tracking-widest text-slate-400">Admin</span>
          </div>

          <nav className="flex-1 space-y-2 px-4">
            <Link to="/admin" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              <HiOutlineViewGrid size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link to="/admin/add-villa" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              <HiOutlineUsers size={20} />
              <span className="font-medium">Add Villa</span>
            </Link>
            <Link to="/admin/villas" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              <HiOutlineHome size={20} />
              <span className="font-medium">Manage Villas</span>
            </Link>
            <Link to="/admin/users" onClick={closeSidebar} className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
              <HiOutlineUsers size={20} />
              <span className="font-medium">User Accounts</span>
            </Link>
          </nav>

          <button
            onClick={logout}
            className="m-4 flex items-center space-x-3 rounded-xl bg-red-500/10 p-3 text-red-500 transition-all hover:bg-red-500 hover:text-white"
          >
            <HiOutlineLogout size={20} />
            <span className="font-bold">Exit Admin</span>
          </button>
        </aside>
      )}

      <main className="w-full min-h-screen overflow-x-hidden p-4 sm:p-6 lg:ml-64 lg:h-screen lg:overflow-y-auto lg:p-10">
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Control Panel</h1>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <HiMenu size={22} />
            </button>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-center text-xs font-bold text-slate-600 shadow-sm sm:text-sm">
            Admin Mode Active
            </div>
            <button
              type="button"
              aria-label="Close sidebar"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
              onClick={closeSidebar}
            >
              <HiX size={20} />
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

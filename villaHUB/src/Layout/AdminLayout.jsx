import { Link, Outlet } from "react-router-dom";
import { HiOutlineHome, HiOutlineLogout, HiOutlineUsers, HiOutlineViewGrid } from "react-icons/hi";
import { useAuth } from "../Context/auth-context";

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="flex w-64 flex-col bg-slate-900 text-white">
        <div className="p-8 text-2xl font-bold tracking-tighter">
          Stay<span className="text-primary">Ease</span>{" "}
          <span className="block text-xs uppercase tracking-widest text-slate-400">Admin</span>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          <Link to="/admin" className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineViewGrid size={20} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link to="/admin/villas" className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
            <HiOutlineHome size={20} />
            <span className="font-medium">Manage Villas</span>
          </Link>
          <Link to="/admin/users" className="flex items-center space-x-3 rounded-xl p-3 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white">
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

      <main className="flex-1 p-10">
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Control Panel</h1>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm">
            Admin Mode Active
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, LogOut, Menu, X, User } from "lucide-react";
import { useAuth } from "../Context/auth-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  // unified logout function
  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300">
      
      {/* Top banner - Upgraded to a sleek gradient */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
        <p className="py-2.5 text-center text-sm font-medium tracking-wide text-white/90 capitalize sm:text-base">
          ✨ Lets meet in the morning
        </p>
      </div>

      {/* Main header - Glassmorphism effect */}
      <div className="border-b border-slate-200/80 bg-white/85 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Logo */}
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-md shadow-blue-200">
              <Building2 size={22} className="group-hover:animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-slate-900">
                VillaHub
              </p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                Vacation Platform
              </p>
            </div>
          </Link>

          {/* Desktop menu */}
          <nav className="hidden items-center gap-8 md:flex">
            
            {/* Nav Links */}
            <div className="flex items-center gap-8 mr-4">
              <Link className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600" to="/">
                Home
              </Link>
              <Link className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600" to="/villas">
                Villas
              </Link>
              <Link className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600" to="/contact">
                Contact
              </Link>
            </div>

            {/* Divider */}
            <div className="h-6 w-px bg-slate-300"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/my-bookings"
                  className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600"
                >
                  My Bookings
                </Link>

                {/* Profile Pill */}
                <Link
                  to="/profile"
                  className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 py-2 pl-2 pr-4 text-sm font-bold text-blue-700 transition-all hover:bg-blue-100 hover:shadow-sm"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white">
                    <User size={14} />
                  </div>
                  {user.name}
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
                >
                  <LogOut size={16} className="transition-transform group-hover:-translate-x-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-600 transition-colors hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
                >
                  Create Account
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition-colors hover:bg-slate-100 active:scale-95 md:hidden"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`absolute inset-x-0 top-[116px] origin-top bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 md:hidden ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col divide-y divide-slate-100 px-6 py-4">

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-4 pb-6 pt-2">
            <Link to="/" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-600">
              Home
            </Link>
            <Link to="/villas" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-600">
              Villas
            </Link>
            <Link to="/contact" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-600">
              Contact
            </Link>
          </div>

          {/* Mobile Auth/User Links */}
          <div className="flex flex-col space-y-4 pb-4 pt-6">
            {user ? (
              <>
                <Link to="/my-bookings" onClick={closeMenu} className="text-base font-bold text-slate-700 hover:text-blue-600">
                  My Bookings
                </Link>

                <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 rounded-xl bg-blue-50 p-4 text-base font-bold text-blue-700">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-0.5">Logged in as</p>
                    {user.name}
                  </div>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-100 bg-red-50 py-3.5 text-base font-bold text-red-600 transition-colors hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <div className="grid gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-xl bg-slate-100 py-3.5 text-base font-bold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Login to your account
                </Link>

                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3.5 text-base font-bold text-white shadow-md shadow-blue-200 transition-colors hover:bg-blue-700"
                >
                  Create an account
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
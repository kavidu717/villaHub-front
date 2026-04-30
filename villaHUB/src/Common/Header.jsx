import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../Context/auth-context";
import { AiOutlineShopping } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-blue-100 backdrop-blur">
      <div className="bg-blue-600">
        <p className="capitalize p-2 text-center font-bold">lets meet in the morning</p>
      </div>
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-white">
            <Building2 size={18} />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">VillaHub</p>
            <p className="text-xs text-slate-500">Vacation booking platform</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Home
          </Link>
          <Link to="/villas" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Villas
          </Link>
          <Link to="/contact" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Contact
          </Link>

          {user ? (
            <div className="flex items-center gap-3">

              <Link to="/my-bookings" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
                My Bookings
              </Link>

              <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700">
                {user.name}
              </div>
              <button
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Create account
              </Link>
            </div>
          )}
        </nav>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-lg border border-slate-200 p-2 text-slate-700 md:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6">
            <Link to="/" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Home
            </Link>
            <Link to="/villas" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Villas
            </Link>
            <Link to="/contact" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Contact
            </Link>

          
            
            {user ? (
              <>
                <Link to="/my-bookings" onClick={closeMenu} className="text-sm font-medium text-slate-700">
                  My Bookings
                </Link>
                <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">{user.name}</div>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                    navigate("/");
                  }}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="grid gap-3">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-medium text-slate-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

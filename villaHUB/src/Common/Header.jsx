import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../Context/auth-context";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
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
          <a href="#featured" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Featured
          </a>
          <a href="#benefits" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Benefits
          </a>
          <a href="#contact" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
            Contact
          </a>

          {user ? (
            <div className="flex items-center gap-3">
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
            <a href="#featured" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Featured
            </a>
            <a href="#benefits" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Benefits
            </a>
            <a href="#contact" onClick={closeMenu} className="text-sm font-medium text-slate-700">
              Contact
            </a>

            {user ? (
              <>
                <div className="rounded-lg bg-slate-100 px-4 py-3 text-sm text-slate-700">{user.name}</div>
                <button
                  onClick={() => {
                    logout();
                    closeMenu();
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

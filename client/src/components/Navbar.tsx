
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition ${
      isActive
        ? "text-blue-600 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => setIsMenuOpen(false)}
          className="text-2xl font-extrabold tracking-tight text-blue-600 sm:text-3xl"
        >
          EventHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/events" className={navLinkClass}>
            Events
          </NavLink>
         {
          user&&<NavLink to="/my-bookings" className={navLinkClass}>
            My Bookings
          </NavLink>
         }
         

          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={navLinkClass}
            >
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {!user ? (
            <>
              <Link
                to="/login"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 text-gray-700 transition hover:bg-gray-100 md:hidden"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-2">

            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/events"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              Events
            </NavLink>

            <NavLink
              to="/my-bookings"
              onClick={() => setIsMenuOpen(false)}
              className={navLinkClass}
            >
              My Bookings
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={navLinkClass}
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard size={17} />
                  Dashboard
                </span>
              </NavLink>
            )}

            <div className="my-2 border-t border-gray-100" />

            {!user ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            )}

          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;


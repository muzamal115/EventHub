import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

interface AdminSidebarProps{
    isOpen:boolean,
    onClose:()=>void;
}

const AdminSidebar = ({isOpen,onClose}:AdminSidebarProps) => {
     const { logout } = useAuth();
     const navigate=useNavigate()
     const handleLogout=async()=>{
        try {
            await logout()
            navigate('/login')

        } catch (error) {
               console.error("Logout error:", error);
        }
     }
       const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;
  return (
        <>
      {/* Mobile Overlay */}

  
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            to="/admin"
            onClick={onClose}
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            EventHub
            <span className="ml-2 text-xs font-semibold text-gray-400">
              ADMIN
            </span>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Management
          </p>

          <NavLink
            to="/admin"
            end
            onClick={onClose}
            className={navLinkClass}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/events"
            onClick={onClose}
            className={navLinkClass}
          >
            <CalendarDays size={19} />
            Events
          </NavLink>

          <NavLink
            to="/admin/bookings"
            onClick={onClose}
            className={navLinkClass}
          >
            <ClipboardList size={19} />
            Bookings
          </NavLink>

        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-gray-100 p-4">

          <Link
            to="/"
            onClick={onClose}
            className="mb-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <ExternalLink size={19} />
            View Website
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>
      </aside>
    </>

  )
}

export default AdminSidebar
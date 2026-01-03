import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  CalendarDays,
  LogOut,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    toast.success("Logged out successfully 👋");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 h-screen bg-black border-r border-yellow-400 fixed left-0 top-0">
      {/* Logo */}
      <div className="p-6 border-b border-yellow-400">
        <h1 className="text-xl font-bold text-yellow-400">
          LeetsEvents Admin
        </h1>
      </div>

      {/* Links */}
      <nav className="p-4 flex flex-col gap-2">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-yellow-400 text-black"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-yellow-400 text-black"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <ShoppingBag size={18} />
          Orders
        </NavLink>

        <NavLink
          to="/admin/events"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? "bg-yellow-400 text-black"
                : "text-white hover:bg-white/10"
            }`
          }
        >
          <CalendarDays size={18} />
          Events
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-yellow-400">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 hover:text-red-300 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}

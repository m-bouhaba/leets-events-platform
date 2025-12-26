import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-[#0F0F0F] text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <NavLink to="/" className="text-xl font-bold tracking-wide">
        <span className="text-yellow-400">Leets</span>Events
      </NavLink>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            Add
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            Events
          </NavLink>
        </li>

        {/* <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400"
                : "hover:text-yellow-300 transition"
            }
          >
            Contact
          </NavLink>
        </li> */}
      </ul>

      {/* Admin */}
      <NavLink
        to="/admin"
        className="bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition"
      >
        Admin
      </NavLink>
    </nav>
  );
}

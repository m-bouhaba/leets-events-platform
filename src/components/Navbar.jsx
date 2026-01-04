import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartSidebar from "./CartSidebar";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur border-b border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/leetsevents.jpg"
              alt="leetsevents logo"
              className="h-14 w-auto object-contain hover:scale-105 transition"
            />
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/home"
              className="text-white hover:text-yellow-400 transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/events"
              className="text-white hover:text-yellow-400 transition"
            >
              Events
            </NavLink>
            <NavLink
              to="/contact"
              className="text-white hover:text-yellow-400 transition"
            >
              Contact
            </NavLink>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative"
            >
              <ShoppingCart className="w-6 h-6 text-white hover:text-yellow-400 transition" />

              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Admin login */}
            <Link
              to="/admin/login"
              className="flex items-center gap-1 text-white hover:text-yellow-400 transition"
            >
              <LogIn className="w-4 h-4" />
              Sign in
            </Link>
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
}

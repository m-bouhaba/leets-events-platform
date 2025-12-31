import { X, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../redux/cartSlice";

export default function CartSidebar({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-black z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-yellow-400">
          <h2 className="text-lg font-bold text-yellow-400">
            Your Tickets 🎟️
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white hover:text-yellow-400 transition" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto h-[calc(100%-160px)]">
          {cartItems.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              No tickets added yet
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {item.price === 0 ? "Free event" : `${item.price} MAD`}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <span className="text-yellow-400 font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-yellow-400">
          <div className="flex justify-between text-white mb-4">
            <span>Total</span>
            <span className="font-bold text-yellow-400">
              {total === 0 ? "Free" : `${total} MAD`}
            </span>
          </div>

          <Link
            to="/checkout"
            onClick={onClose}
            className="block text-center w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition"
          >
            Continue to Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}

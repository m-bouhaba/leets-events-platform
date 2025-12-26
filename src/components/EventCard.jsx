import React from "react";
import { ShoppingCart, Trash2, Edit } from "lucide-react";

export default function EventCard({event,
onDelete,
  onUpdate,
  onAddToCart,
  showAdminActions = false,
}) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-80">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.category}</p>
        <p className="text-sm text-gray-400">{event.date}</p>
        <p className="mt-2 font-semibold">
          {event.price === 0 ? "Free" : `${event.price}MAD`}
        </p>

        <div className="mt-4 flex gap-2">
          {showAdminActions ? (
            <>
              <button
                onClick={() => onUpdate(event)}
                className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition"
              >
                <Edit className="w-4 h-4" /> Update
              </button>
              <button
                onClick={() => onDelete(event.id)}
                className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </>
          ) : (
            <button
              onClick={() => onAddToCart(event)}
              className="flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition"
            >
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


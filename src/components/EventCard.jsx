import React from "react";
import { ShoppingCart, Ticket } from "lucide-react";

export default function EventCard({ event, onAddToCart }) {
  return (
    <div
      className="
        group relative
        bg-[#0F0F0F]
        rounded-2xl
        overflow-hidden
        shadow-lg
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl
      "
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="
            h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 text-white">
        {/* Category */}
        <span className="inline-block mb-2 text-xs font-semibold text-yellow-400 uppercase tracking-wider">
          {event.category}
        </span>

        {/* Title */}
        <h3 className="text-lg font-bold leading-snug mb-1">
          {event.title}
        </h3>

        {/* Date */}
        <p className="text-sm text-gray-400 mb-3">
          {event.date}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <span className="text-base font-semibold">
            {event.price === 0 ? (
              <span className="text-green-400 flex items-center gap-1">
                <Ticket className="w-4 h-4" /> Free
              </span>
            ) : (
              <span className="text-yellow-400">
                {event.price} MAD
              </span>
            )}
          </span>

          {/* Action */}
          <button
            onClick={() => onAddToCart(event)}
            className="
              flex items-center gap-2
              bg-yellow-400 text-black
              px-4 py-2
              rounded-full
              text-sm font-semibold
              transition-all
              hover:bg-yellow-300 hover:scale-105
            "
          >
            <ShoppingCart className="w-4 h-4" />
            {event.price === 0 ? "Join" : "Buy"}
          </button>
        </div>
      </div>
    </div>
  );
}

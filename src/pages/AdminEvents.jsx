import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

import UpdateEventModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import AddEvent from "../components/AdminAdd";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  /* ================= FETCH ================= */
  const fetchEvents = async () => {
    try {
      const res = await axios.get(
        "https://694e4ee4b5bc648a93bff060.mockapi.io/api/events"
      );
      setEvents(res.data.reverse());
    } catch {
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  /* ================= HANDLERS ================= */

  const handleUpdateEvent = async (updatedEvent) => {
  try {
    await axios.put(
      `https://694e4ee4b5bc648a93bff060.mockapi.io/api/events/${updatedEvent.id}`,
      {
        title: updatedEvent.title,
        description: updatedEvent.description,
        category: updatedEvent.category,
        date: updatedEvent.date,
        price: Number(updatedEvent.price),
        image: updatedEvent.image,
      }
    );

    toast.success("Event updated successfully ✨");

    // 🔄 REFETCH depuis MockAPI (IMPORTANT)
    fetchEvents();

  } catch (error) {
    console.error(error);
    toast.error("Failed to update event");
  }
};

  const handleDeleteConfirm = async () => {
    await axios.delete(
      `https://694e4ee4b5bc648a93bff060.mockapi.io/api/events/${selectedEvent.id}`
    );
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    toast.success("Event deleted ✅");
    setIsDeleteOpen(false);
  };

  const getStatusBadge = (event) => {
    if (event.ticketsSold >= event.ticketsTotal) {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-400">
          Sold Out
        </span>
      );
    }
    if (event.ticketsSold / event.ticketsTotal > 0.5) {
      return (
        <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
          Filling Up
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
        Available
      </span>
    );
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 px-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">
            Events Management
          </h1>
          <p className="text-sm text-gray-400">
            Create, update and manage all events
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
        >
          <FiPlus /> Add Event
        </button>
      </div>

      {/* TABLE */}
      <div className="px-6">
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 backdrop-blur">
          <table className="w-full text-sm text-white">
            <thead className="bg-white/5 text-gray-300 uppercase tracking-wider">
              <tr>
                <th className="p-4 text-left">Event</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Tickets</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {events.length === 0 && (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-500"
                  >
                    No events found
                  </td>
                </tr>
              )}

              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-t border-white/5 hover:bg-white/5 transition"
                >
                  {/* EVENT */}
                  <td className="p-4 flex items-center gap-3">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-12 h-12 rounded-md object-cover border border-yellow-400/20"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-xs text-gray-400 truncate w-40">
                        {event.description}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-gray-300">
                    {event.category}
                  </td>

                  <td className="p-4 text-gray-300">
                    {new Date(event.date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {event.price > 0 ? (
                      <span className="text-yellow-400 font-semibold">
                        {event.price} MAD
                      </span>
                    ) : (
                      <span className="text-green-400">Free</span>
                    )}
                  </td>

                  <td className="p-4 text-gray-300">
                    {event.ticketsSold || 0} /{" "}
                    {event.ticketsTotal || 100}
                  </td>

                  <td className="p-4">
                    {getStatusBadge(event)}
                  </td>

                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsUpdateOpen(true);
                      }}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <FiEdit size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsDeleteOpen(true);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD */}
      <AddEvent
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSuccess={(newEvent) =>
          setEvents([newEvent, ...events])
        }
      />

      {/* UPDATE */}
      {isUpdateOpen && (
        <UpdateEventModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          initialData={selectedEvent}
          onSubmit={handleUpdateEvent}
        />
      )}

      {/* DELETE */}
      {isDeleteOpen && (
        <DeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </>
  );
}

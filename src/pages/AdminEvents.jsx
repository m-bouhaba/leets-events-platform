import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateEventModal from "../components/UpdateModal";
import DeleteModal from "../components/DeleteModal";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchEvents = async () => {
    const res = await axios.get(
      "https://694e4ee4b5bc648a93bff060.mockapi.io/api/events"
    );
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleUpdateClick = (event) => {
    setSelectedEvent(event);
    setIsUpdateOpen(true);
  };

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    await axios.delete(
      `https://694e4ee4b5bc648a93bff060.mockapi.io/api/events/${selectedEvent.id}`
    );
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    toast.success("Event deleted ✅");
    setIsDeleteOpen(false);
  };

  const handleAddNew = () => {
    setSelectedEvent(null);
    setIsUpdateOpen(true);
  };

  const getStatusBadge = (event) => {
    if (event.ticketsSold >= event.ticketsTotal) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
          Sold Out
        </span>
      );
    } else if (event.ticketsSold / event.ticketsTotal > 0.5) {
      return (
        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">
          Filling Up
        </span>
      );
    }
    return (
      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
        Available
      </span>
    );
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4 px-6">
        <h1 className="text-2xl font-bold">Admin Events</h1>
        <button
          onClick={handleAddNew}
          className="bg-[#f5c542] hover:bg-[#e0b534] text-gray-900 px-4 py-2 rounded-md font-semibold transition"
        >
          Add New Event
        </button>
      </div>

      <div className="overflow-x-auto px-6">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Tickets</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr
                key={event.id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                {/* Mini-card style */}
                <td className="flex items-center gap-3 p-3">
                  {event.image && (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-xs text-gray-500 truncate w-36">
                      {event.description}
                    </p>
                  </div>
                </td>

                <td className="p-3">{event.category}</td>
                <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
                <td className="p-3">{event.price > 0 ? `${event.price}MAD` : "Free"}</td>
                <td className="p-3">
                  {event.ticketsSold || 0} / {event.ticketsTotal || 100}
                </td>
                <td className="p-3">{getStatusBadge(event)}</td>
                <td className="p-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleUpdateClick(event)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FiEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(event)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isUpdateOpen && (
        <UpdateEventModal
          isOpen={isUpdateOpen}
          onClose={() => setIsUpdateOpen(false)}
          initialData={selectedEvent}
          onSubmit={async (updatedEvent) => {
            if (selectedEvent) {
              // Update existing event
              await axios.put(
                `https://694e4ee4b5bc648a93bff060.mockapi.io/api/events/${updatedEvent.id}`,
                updatedEvent
              );
              setEvents(
                events.map((e) =>
                  e.id === updatedEvent.id ? updatedEvent : e
                )
              );
              toast.success("Event updated ✅");
            } else {
              // Add new event
              const res = await axios.post(
                `https://694e4ee4b5bc648a93bff060.mockapi.io/api/events`,
                updatedEvent
              );
              setEvents([res.data, ...events]);
              toast.success("Event added ✅");
            }
            setIsUpdateOpen(false);
          }}
        />
      )}

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

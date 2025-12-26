import React from 'react'

export default function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" max-w-sm bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this event?</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
          >
            Yes, Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}


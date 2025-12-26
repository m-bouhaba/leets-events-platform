import React, { useState, useRef } from "react";
import { log } from "three";
const EVENT_CATEGORIES = [
  "Music",
  "Party",
  "Conference",
  "Exhibition",
  "Sports",
  "Family Day",
  "Other",
];
export default function UpdateEventModal({ isOpen, onClose, initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {});
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);

  

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 min-h-screen bg-black/50 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* REPRIS DU FORMULAIRE AddEvent */}
          <label>Title</label>
          <input
            name="title"
            placeholder="Event title"
            value={formData.title || ""}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.title ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-yellow-200"
            }`}
          />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Event description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full rounded-md border px-3 py-2 text-sm resize-none
              focus:outline-none focus:ring-2
              ${
                errors.description
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              }
            `}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}

            <div>
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm bg-white
              focus:outline-none focus:ring-2
              ${formData.category === "" ? "text-gray-400" : "text-gray-800"}
              ${
                errors.category
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              }
            `}
            >
              <option value="" disabled hidden>
                Select category
              </option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="text-gray-800">
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-xs text-red-500">{errors.category}</p>
            )}
          </div>

          <div>
            <label>Event date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm
              focus:outline-none focus:ring-2
              ${
                errors.date
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              }
            `}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-500">{errors.date}</p>
            )}
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              min="0"
              placeholder="Price (0 = Free)"
              value={formData.price}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm
              focus:outline-none focus:ring-2
              ${
                errors.price
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-yellow-200"
              }
            `}
            />
            {errors.price && (
              <p className="mt-1 text-xs text-red-500">{errors.price}</p>
            )}
          </div>
          <div className="w-full">
            <label
              className={`
              flex items-center justify-between
              w-full px-3 py-2
              border rounded-md
              cursor-pointer
              bg-white
              text-sm text-gray-600
              transition
              ${errors.image ? "border-red-500" : "border-gray-300"}
              hover:border-gray-400
              focus-within:ring-2 focus-within:ring-[#f5c542]/40
            `}
            >
              <span className="truncate">
                {formData.image ? "Image sélectionnée" : "Choisir une image"}
              </span>
              

              <span
                className="
                ml-3 px-4 py-1.5
                bg-[#f5c542]
                text-gray-900
                rounded-md
                text-sm font-medium
                hover:bg-[#e0b534]
                transition
              "
              >
                Parcourir
              </span>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                ref={imageInputRef}
                className="hidden"
              />
            </label>
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-md border"
                />
              )}

            {errors.image && (
              <p className="mt-1 text-xs text-red-500">{errors.image}</p>
            )}
          </div>


          
          
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="flex-1 bg-[#f5c542] text-gray-900 py-2 rounded-md font-semibold hover:bg-[#e0b534] transition"
            >
              Update Event
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

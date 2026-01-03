import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

const EVENT_CATEGORIES = [
  "Music",
  "Party",
  "Conference",
  "Exhibition",
  "Sports",
  "Family Day",
  "Other",
];

export default function UpdateEventModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({});
  const imageInputRef = useRef(null);

  /* 🔄 sync data when opening modal */
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 h-">
        <div className="relative w-full max-w-lg bg-black border border-yellow-400/30 rounded-xl p-6">

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 transition"
          >
            <X />
          </button>

          <h2 className="text-xl font-bold text-yellow-400 mb-6">
            Update Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* TITLE */}
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Event title"
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              rows={3}
              value={formData.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400 resize-none"
            />

            {/* CATEGORY */}
            <select
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            >
              <option value="">Select category</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* DATE */}
            <input
              type="date"
              name="date"
              value={formData.date || ""}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />

            {/* PRICE */}
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price || 0}
              onChange={handleChange}
              placeholder="Price (0 = Free)"
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />

            {/* IMAGE */}
            <div>
              <label className="flex items-center justify-between w-full px-3 py-2 border border-white/10 rounded cursor-pointer text-sm text-gray-400 hover:border-yellow-400 transition">
                <span className="truncate">
                  {formData.image ? "Image selected" : "Choose image"}
                </span>

                <span className="ml-3 px-4 py-1.5 bg-yellow-400 text-black rounded text-sm font-medium hover:bg-yellow-300 transition">
                  Browse
                </span>

                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-3 w-24 h-24 object-cover rounded border border-white/10"
                />
              )}
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
              >
                Update Event
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-white/10 text-white py-2 rounded hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
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

export default function AddEvent({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null; // ✅ IMPORTANT

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    price: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= IMAGE UPLOAD ================= */
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "preset_des_evenements");
    data.append("folder", "events");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dh6r1fw3q/image/upload",
        data
      );
      setFormData((prev) => ({
        ...prev,
        image: res.data.secure_url,
      }));
    } finally {
      setUploading(false);
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Title required";
    if (!formData.description) newErrors.description = "Description required";
    if (!formData.category) newErrors.category = "Category required";
    if (!formData.date) newErrors.date = "Date required";
    if (formData.price === "") newErrors.price = "Price required";
    if (!formData.image) newErrors.image = "Image required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await axios.post(
      "https://694e4ee4b5bc648a93bff060.mockapi.io/api/events",
      {
        ...formData,
        price: Number(formData.price),
      }
    );

    toast.success("Event added 🎉");
    onSuccess(res.data); // ✅ refresh table
    onClose(); // ✅ close modal
  };

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 z-40"
      />

      {/* MODAL */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="w-full max-w-lg bg-black border border-yellow-400/30 rounded-xl p-6 relative">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400"
          >
            <X />
          </button>

          <h2 className="text-xl font-bold text-yellow-400 mb-6">
            Add New Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              placeholder="Event title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white focus:ring-2 focus:ring-yellow-400"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
            >
              <option value="">Select category</option>
              {EVENT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
            />

            <input
              type="number"
              name="price"
              min="0"
              placeholder="Price (0 = Free)"
              value={formData.price}
              onChange={handleChange}
              className="w-full bg-black border border-white/10 px-3 py-2 rounded text-white"
            />

            {/* IMAGE */}
            <input
              type="file"
              onChange={handleImageUpload}
              ref={imageInputRef}
              className="text-white"
            />

            <button
              disabled={uploading}
              className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300 transition"
            >
              Add Event
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

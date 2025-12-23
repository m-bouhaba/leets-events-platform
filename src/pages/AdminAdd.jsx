import { useState, useRef } from "react";
import axios from "axios";
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

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    price:"",
    image: "",
  });
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const imageInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    } catch (error) {
      console.error("Cloudinary upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.date
    ) {
      console.log("hello");
      
      setError("Champ requis");
      return;
    }
    await axios.post("http://localhost:3000/events", {
      ...formData,
      price: Number(formData.price),
    });
      
    setError("");

    setSuccess(true);

    setFormData({
      title: "",
      description: "",
      category: "",
      date: "",
      price: "",
      image: "",
    });
    
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };
  
  return (
    <div className="admin-form-container">
      <h2>Add New Event</h2>

      {success && <p className="success">Event added successfully ✅</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          name="title"
          placeholder="Event title"
          value={formData.title}
          onChange={handleChange}
          />
          {error && <p className="error">{error}</p>}

        <textarea
          name="description"
          placeholder="Event description"
          value={formData.description}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="SelectInput"
        >
          <option value="" disabled hidden>Select category</option>
          {EVENT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {error && <p className="error">{error}</p>}

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}

        <input
          type="number"
          name="price"
          min= "0"
          placeholder="price"
          value={formData.price}
          onChange={handleChange}
        />
        {error && <p className="error">{error}</p>}

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageInputRef}
        />
        {error && <p className="error">{error}</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            style={{
              marginTop: "10px",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        )}

        {uploading && <p>Uploading image...</p>}

        <button type="submit" disabled={uploading}>
          Add Event
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // 👉 plus tard : n8n
    toast.success("Message sent successfully 🚀");

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* HERO */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-yellow-400 mb-4">
          Contact LeetsEvents
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Let’s connect and build unforgettable event experiences together.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* INFO */}
        <div className="space-y-8">
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">
              Get in touch
            </h3>

            <div className="space-y-4 text-gray-300">
              <div className="flex items-center gap-3">
                <Mail className="text-yellow-400" />
                contact@leetsevents.com
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-yellow-400" />
                +212 6 00 00 00 00
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-yellow-400" />
                Morocco
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 rounded-2xl p-8 border border-zinc-800 space-y-6"
        >
          {/* NAME */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Full Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full bg-black border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2
                ${
                  errors.name
                    ? "border-red-500 focus:ring-red-400"
                    : "border-zinc-700 focus:ring-yellow-400"
                }`}
              placeholder="Your name"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Email Address
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full bg-black border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-zinc-700 focus:ring-yellow-400"
                }`}
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block text-sm mb-1 text-gray-300">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              className={`w-full bg-black border rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2
                ${
                  errors.message
                    ? "border-red-500 focus:ring-red-400"
                    : "border-zinc-700 focus:ring-yellow-400"
                }`}
              placeholder="Tell us about your idea..."
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 text-black font-semibold py-2.5 rounded-md hover:bg-yellow-300 transition"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

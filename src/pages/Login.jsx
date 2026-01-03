import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(formData.email, formData.password);

    if (success) {
      toast.success("Welcome Admin 👋");
      navigate("/admin/dashboard"); // ✅ REDIRECT ICI
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-black border border-yellow-400 rounded-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-black border border-gray-600 text-white px-4 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-black border border-gray-600 text-white px-4 py-2 rounded-md
            focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            type="submit"
            className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-md font-semibold hover:bg-yellow-300 transition disabled:opacity-50"
          >
            Login
          </button>
        </form>
         <p className="text-xs text-gray-400 text-center mt-6">
          Admin access only – LeetsEvents
        </p>
      </div>
    </div>
  );
}

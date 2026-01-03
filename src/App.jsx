import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./admin/AdminLayout";

import Events from "./pages/Events";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import AdminEvents from "./pages/AdminEvents";
import OrdersAdmin from "./pages/OrdersAdmin";
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

/* ===== PROTECTED ROUTE ===== */
function ProtectedRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("adminAuth");

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Routes>
        {/* ===== USER SPACE ===== */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>

        {/* ===== ADMIN LOGIN (PUBLIC) ===== */}
        <Route path="/admin/login" element={<Login />} />

        {/* ===== ADMIN SPACE (PROTECTED) ===== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="events" element={<AdminEvents />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

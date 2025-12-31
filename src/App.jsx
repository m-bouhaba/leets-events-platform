import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import UserLayout from "./layouts/UserLayout";

// Pages USER
import Events from "./pages/Events";
// plus tard : Home, Contact, Checkout

import "./App.css";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Home from "./pages/Home";
import AdminLayout from "./admin/AdminLayout";
import AdminEvents from "./pages/AdminEvents";
import OrdersAdmin from "./pages/OrdersAdmin";

function App() {
  return (
    <BrowserRouter>
      {/* Toasts globaux */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes>
        {/* ===== USER SPACE ===== */}
        <Route element={<UserLayout />}>
          <Route path="/events" element={<Events />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="events" element={<AdminEvents />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

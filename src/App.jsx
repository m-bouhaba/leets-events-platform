import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AdminAdd from "./pages/AdminAdd";
import AdminEvents from "./pages/AdminEvents";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    
    <BrowserRouter>
    
    {/*   <CartSidebar /> */}
<Navbar />
<Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<AdminAdd />} />
        <Route path="/events" element={< AdminEvents />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App

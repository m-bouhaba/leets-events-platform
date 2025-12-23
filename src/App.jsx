import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import AdminAdd from "./pages/AdminAdd";
import AdminEvents from "./pages/AdminEvents";

function App() {
  return (
    
    <BrowserRouter>
    
    {/*   <CartSidebar /> */}

      <Routes>
        <Route path="/" element={<AdminAdd />} />
        <Route path="/events" element={< AdminEvents />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App

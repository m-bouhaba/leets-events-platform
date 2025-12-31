import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function UserLayout() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-black text-white">
        <Outlet />
      </main>
    </>
  );
}



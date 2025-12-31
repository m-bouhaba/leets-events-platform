import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white px-6 text-center">
      <div className="animate-scaleIn">
        <CheckCircle className="w-24 h-24 text-yellow-400 mx-auto mb-6" />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        🎉 Success!
      </h1>

      <p className="text-gray-400 max-w-md mb-8">
        Your registration has been successfully completed.
        A confirmation email will be sent shortly.
      </p>

      <Link
        to="/events"
        className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
      >
        Back to Events
      </Link>
    </div>
  );
}

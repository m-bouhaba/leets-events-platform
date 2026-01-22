import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
    });

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
    }

    if (!formData.fullName || !formData.email || !formData.phone) {
        toast.error("Please fill all fields");
        return;
    }

    try {
        setLoading(true);

        const order = {
            customer: {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
            },
            items: cartItems,
            total,
            createdAt: new Date().toISOString(),
            source: "frontend-checkout",
        };

        //  N8N
        // await axios.post(
        //     "http://localhost:5678/webhook-test/event",
            
        //     order
        // );
         await axios.post(
            "https://694e4ee4b5bc648a93bff060.mockapi.io/api/orders",
            
            order
        );

        dispatch(clearCart());

        toast.success(
            total === 0
                ? "Registration confirmed 🎉"
                : "Payment successful 🎉"
        );

        navigate("/success");
    } catch (error) {
        console.error(error);
        toast.error("Failed to process order");
    } finally {
        setLoading(false);
    }
};



    return (
        <div className="min-h-screen bg-black text-white pt-32 px-6">
            <h1 className="text-3xl font-bold text-yellow-400 mb-10">
                Checkout
            </h1>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto"
            >
                {/* LEFT - FORM */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">
                        Your Information
                    </h2>

                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>

                {/* RIGHT - SUMMARY */}
                <div className="bg-white/5 rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold text-yellow-400">
                        Order Summary
                    </h2>

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between text-sm"
                        >
                            <span>
                                {item.title} × {item.quantity}
                            </span>
                            <span>
                                {item.price === 0
                                    ? "Free"
                                    : `${item.price * item.quantity} MAD`}
                            </span>
                        </div>
                    ))}

                    <hr className="border-white/10" />

                    <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-yellow-400">
                            {total === 0 ? "Free" : `${total} MAD`}
                        </span>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full mt-6 font-semibold py-3 rounded-lg transition
                            ${loading
                                ? "bg-yellow-300 cursor-not-allowed"
                                : "bg-yellow-400 hover:bg-yellow-300 text-black"
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full"></span>
                                Processing...
                            </span>
                        ) : total === 0 ? (
                            "Confirm Participation"
                        ) : (
                            "Confirm & Pay"
                        )}
                    </button>

                </div>
            </form>
        </div>
    );
}

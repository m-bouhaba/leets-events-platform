import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "../components/EventCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export default function Events() {
    const [events, setEvents] = useState([]);
      const dispatch = useDispatch();

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get("https://694e4ee4b5bc648a93bff060.mockapi.io/api/events");
            setEvents(res.data);
        };
        fetchEvents();
    }, []);

    const handleAddToCart = (event) => {
        dispatch(addToCart({ ...event, quantity: 1 }));
        toast.success("Event added to cart");
    };

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {events.map((event) => (
                <EventCard
                    key={event.id}
                    event={event}
                    onAddToCart={handleAddToCart}
                />
            ))}
        </div>
    );
}

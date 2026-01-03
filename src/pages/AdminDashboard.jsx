import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#FACC15", "#4ADE80"];

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://694e4ee4b5bc648a93bff060.mockapi.io/api/orders")
      .then((res) => setOrders(res.data));
  }, []);

  /* ---------- Line chart : activity over time ---------- */
  const ordersByDate = {};

  orders.forEach((order) => {
    const date = new Date(order.createdAt).toLocaleDateString();
    ordersByDate[date] = (ordersByDate[date] || 0) + 1;
  });

  const lineData = Object.keys(ordersByDate).map((date) => ({
    date,
    orders: ordersByDate[date],
  }));

  /* ---------- Bar chart : participants per event ---------- */
  const eventStats = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      eventStats[item.title] =
        (eventStats[item.title] || 0) + item.quantity;
    });
  });

  const barData = Object.keys(eventStats).map((key) => ({
    name: key,
    participants: eventStats[key],
  }));

  /* ---------- Donut : free vs paid ---------- */
  const pieData = [
    {
      name: "Free",
      value: orders.filter((o) => o.total === 0).length,
    },
    {
      name: "Paid",
      value: orders.filter((o) => o.total > 0).length,
    },
  ];

  return (
    <div className="space-y-16">

      {/* 🔥 LINE CHART */}
      <section>
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">
          Activity Overview
        </h2>

        <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#FACC15"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 🔁 SPLIT SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* BAR */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Participants per Event
          </h2>
          <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip />
                <Bar
                  dataKey="participants"
                  fill="#FACC15"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* DONUT */}
        <div>
          <h2 className="text-xl font-semibold text-yellow-400 mb-4">
            Event Type Distribution
          </h2>
          <div className="bg-black/40 border border-yellow-400/20 rounded-2xl p-6 flex justify-center">
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </section>

      {/* 💬 INSIGHT */}
      <section className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-6">
        <p className="text-yellow-400 font-semibold mb-1">
          Insight
        </p>
        <p className="text-gray-300">
          Free community events drive higher participation, while paid
          events generate sustainable revenue for the club.
        </p>
      </section>
    </div>
  );
}

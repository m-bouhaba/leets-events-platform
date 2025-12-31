import { useEffect, useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://694e4ee4b5bc648a93bff060.mockapi.io/api/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-yellow-400 text-lg">
        Loading orders...
      </div>
    );
  }

  return (
    <div>
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-yellow-400">
          Orders
        </h1>
        <p className="text-gray-400">
          Manage all customer orders
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-black rounded-xl border border-yellow-400">
        <table className="w-full text-left">
          <thead className="bg-yellow-400 text-black">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Events</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-white/10 text-white hover:bg-white/5 transition"
              >
                {/* Customer */}
                <td className="p-4">
                  <p className="font-semibold">
                    {order.customer.fullName}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order.customer.email}
                  </p>
                  <p className="text-sm text-gray-400">
                    {order.customer.phone}
                  </p>
                </td>

                {/* Events */}
                <td className="p-4">
                  {order.items.map((item) => (
                    <p key={item.id} className="text-sm">
                      🎟️ {item.title} × {item.quantity}
                    </p>
                  ))}
                </td>

                {/* Total */}
                <td className="p-4 font-bold text-yellow-400">
                  {order.total === 0
                    ? "Free"
                    : `${order.total} MAD`}
                </td>

                {/* Date */}
                <td className="p-4 text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                {/* Action */}
                <td className="p-4 text-center">
                  <button className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300">
                    <Eye size={18} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-6 text-center text-gray-400">
            No orders found
          </div>
        )}
      </div>
    </div>
  );
}

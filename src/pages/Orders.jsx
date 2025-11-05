

import React from "react";
import { useSelector } from "react-redux";
import { useCart } from "../context/CartContext.jsx";

const Orders = () => {
  const user = useSelector((state) => state.auth.user);
  const { orders, setOrders } = useCart(); // assuming your context has setOrders

  const userOrders = orders.filter((o) => o.userEmail === user?.email);

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      // Remove the order from the context
      const updatedOrders = orders.filter((o) => o.id !== orderId);
      setOrders(updatedOrders);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {userOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="border p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div className="mb-2 md:mb-0">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Date:</strong> {order.date || "N/A"}</p>
                <p><strong>Total:</strong> ₹{(order.totalPrice || 0).toFixed(2)}</p>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <p>
                  <strong>Items:</strong>{" "}
                  {order.items && order.items.length > 0
                    ? order.items.map((i) => i.name || i.title).join(", ")
                    : "No items"}
                </p>
                <button
                  onClick={() => handleCancel(order.id)}
                  className="ml-0 md:ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


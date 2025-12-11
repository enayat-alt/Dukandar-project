

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCart } from "../context/CartContext.jsx";

const Orders = () => {
  const { deleteOrder } = useCart(); // use deleteOrder from context
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        // filter orders for logged-in user
        const userOrders = data.filter((o) => o.userId === user?.id);
        setOrders(userOrders);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const handleCancel = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      const result = await deleteOrder(orderId);
      if (result.success) {
        fetchOrders(); // refresh orders after deletion
      } else {
        alert(result.message || "Failed to cancel order");
      }
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-500">Place an order to see it here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold text-lg mb-2">Order #{order.id}</h3>
            <p className="text-gray-600">
              Date: {new Date(order.createdAt || order.date).toLocaleString()}
            </p>
            <p className="font-semibold text-pink-600 mt-2">
              Total Price: ₹{order.totalPrice}
            </p>

            <div className="mt-3">
              <h4 className="font-semibold mb-1">Items:</h4>
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 mb-2 border p-3 rounded"
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>
                        ₹{item.price} × {item.quantity}
                      </p>
                      <p>Total: ₹{item.total}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found</p>
              )}
              <button
                onClick={() => handleCancel(order.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Cancel Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

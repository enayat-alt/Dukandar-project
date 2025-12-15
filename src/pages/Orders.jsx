
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetUserOrdersQuery,
  useCancelOrderMutation,
} from "../services/orderApi";

const Orders = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch orders with RTK Query
  const { data: orders = [], isLoading, isError } = useGetUserOrdersQuery();

  // Mutation for cancelling orders
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await cancelOrder(orderId).unwrap(); // ✅ automatically triggers refetch
      alert("Order cancelled successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to cancel order");
    }
  };

  if (isLoading)
    return <p className="text-center mt-8">Loading your orders...</p>;
  if (isError)
    return (
      <p className="text-center mt-8 text-red-500">
        Failed to load orders
      </p>
    );
  if (!orders.length)
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-500">Place an order to see it here.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border p-4 rounded shadow bg-white"
          >
            <h3 className="font-semibold text-lg mb-2">Order #{order.id}</h3>
            <p className="text-gray-600">
              Date: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="font-semibold text-pink-600 mt-2">
              Total Price: ₹{order.totalPrice}
            </p>

            <div className="mt-3">
              <h4 className="font-semibold mb-1">Items:</h4>
              {order.items?.length ? (
                order.items.map((item, idx) => (
                  <div
                    key={idx}
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

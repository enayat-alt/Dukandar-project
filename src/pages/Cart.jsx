import React, { useMemo } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  // Safely calculate total price
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (total, item) => total + Number(item.price) * (item.quantity || 1),
      0
    );
  }, [cart]);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      alert("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500">Add some products to place an order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name || item.title}
                className="w-20 h-20 object-cover"
              />
              <div>
                <p className="font-semibold">{item.name || item.title}</p>
                <p>₹{Number(item.price).toFixed(2)}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>

            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;



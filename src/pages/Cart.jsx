

import React, { useMemo } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePlaceOrderMutation } from "../services/orderApi";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [placeOrder] = usePlaceOrderMutation();

  // Total price calculation
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

    try {
      const formattedCart = cart.map(item => ({
        productId: item.productId || item.id,
        quantity: item.quantity || 1,
      }));

      await placeOrder(formattedCart).unwrap();
      alert("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert(err?.data?.message || "Failed to place order");
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
    <div className="max-w-6xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6">My Cart</h2>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.productId || item.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between p-4 hover:shadow-md transition"
          >
            {/* Product Info */}
            <div className="flex items-center gap-4 flex-1">
              <img
                src={item.image}
                alt={item.name || item.title}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-gray-900">{item.name || item.title}</p>
                <p className="text-gray-700">₹{Number(item.price).toFixed(2)}</p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item.productId || item.id })}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border rounded">{item.quantity || 1}</span>
                  <button
                    onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item.productId || item.id })}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
              <button
                onClick={() => handleRemove(item.productId || item.id)}
                className="bg-gray-200 text-red-400 px-4 py-1 rounded hover:bg-gray-300 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Place Order */}
      <div className="mt-6 flex flex-col md:flex-row justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <p className="text-xl font-bold text-gray-900">Total: ₹{totalPrice.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="mt-3 md:mt-0 bg-white text-gray-800 border border-gray-300 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

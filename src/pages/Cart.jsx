import React, { useMemo, useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { usePlaceOrderMutation } from "../services/orderApi";
import { useCreatePaymentIntentMutation } from "../services/paymentApi";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CashOnDelivery from "../components/CashOnDelivery";

// Stripe Init
const stripePromise = loadStripe(
  "pk_test_51SesVSEYQpJvQJZbFnkv799jQDfdpCTm2vF4ZGpbMf3nBSDqD6zegZcBH56kd2at04bzSSMMIPNdUH0ZGr3bKgQj00kkyBtY1q"
);

// ------------------ Stripe Checkout ------------------
const CheckoutForm = ({ totalPrice, onSuccess, setSnackbar }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [loading, setLoading] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    try {
      const res = await createPaymentIntent(totalPrice).unwrap();

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        res.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setSnackbar({ open: true, message: error.message, severity: "error" });
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch {
      setSnackbar({ open: true, message: "Payment failed", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} className="bg-white p-6 rounded-lg shadow w-full">
      <h3 className="text-lg font-semibold mb-4">Card Payment</h3>

      <CardElement className="p-4 border rounded mb-4" />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700"
      >
        {loading ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

// ------------------ MAIN CART ------------------
const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [placeOrder] = usePlaceOrderMutation();

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + Number(item.price) * (item.quantity || 1),
        0
      ),
    [cart]
  );

  const handleCardSuccess = async (paymentIntent) => {
    try {
      const items = cart.map((i) => ({
        productId: i.productId || i.id,
        quantity: i.quantity || 1,
      }));

      await placeOrder({
        items,
        paymentId: paymentIntent.id,
        paymentStatus: paymentIntent.status,
      }).unwrap();

      dispatch({ type: "CLEAR_CART" });
      navigate("/orders");
    } catch {
      setSnackbar({
        open: true,
        message: "Order placement failed",
        severity: "error",
      });
    }
  };

  if (!cart.length)
    return (
      <div className="max-w-4xl mx-auto mt-10 text-center">
        <h2 className="text-2xl font-bold">Cart is Empty</h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">My Cart</h2>

      {/* Cart Items */}
      {cart.map((item) => (
        <div
          key={item.productId || item.id}
          className="bg-white border rounded-lg shadow p-4 flex justify-between"
        >
          <div className="flex gap-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p>₹{item.price}</p>
              <p>Qty: {item.quantity || 1}</p>
            </div>
          </div>

          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: item.productId || item.id,
              })
            }
            className="text-red-500 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}

      {/* Payment Selection */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-6">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          Card Payment
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          Cash on Delivery
        </label>
      </div>

      {/* Payment Section */}
      {paymentMethod === "card" ? (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            totalPrice={totalPrice}
            onSuccess={handleCardSuccess}
            setSnackbar={setSnackbar}
          />
        </Elements>
      ) : (
        <CashOnDelivery cart={cart} dispatch={dispatch} navigate={navigate} />
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;

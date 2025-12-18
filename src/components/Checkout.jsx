

import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { usePlaceOrderMutation } from "../services/orderApi";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Snackbar, Alert } from "@mui/material";

const stripePromise = loadStripe(
  "pk_test_51SesVSEYQpJvQJZbFnkv799jQDfdpCTm2vF4ZGpbMf3nBSDqD6zegZcBH56kd2at04bzSSMMIPNdUH0ZGr3bKgQj00kkyBtY1q"
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": { color: "#a0aec0" },
      padding: "12px 14px",
    },
    invalid: { color: "#fa755a", iconColor: "#fa755a" },
  },
  hidePostalCode: true,
};

// ----------- Inner Checkout Form -----------
const CheckoutForm = ({ cart, totalPrice, onPaymentSuccess, setSnackbar }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [placeOrder] = usePlaceOrderMutation();

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!cart || !cart.length) {
      setSnackbar({ open: true, message: "Cart is empty", severity: "error" });
      return;
    }

    setLoading(true);

    try {
      // Call backend to create PaymentIntent
      const res = await placeOrder({ 
        items: cart.map(i => ({ productId: i.productId || i.id, quantity: i.quantity || 1 })),
        totalPrice,
      }).unwrap();

      const clientSecret = res.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (error) {
        setSnackbar({ open: true, message: error.message, severity: "error" });
        setLoading(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent);
      }
    } catch (err) {
      console.error(err);
      setSnackbar({ open: true, message: "Payment failed", severity: "error" });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handlePayment} className="mt-6 p-6 border rounded shadow-md bg-white w-full">
      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
      <CardElement options={CARD_ELEMENT_OPTIONS} className="p-4 border rounded mb-4" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition font-semibold"
      >
        {loading ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

// ----------- Checkout Component -----------
const Checkout = ({ totalPrice }) => {
  const { cart, dispatch } = useCart();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      const items = cart.map((i) => ({ productId: i.productId || i.id, quantity: i.quantity || 1 }));

      if (!items.length) {
        setSnackbar({ open: true, message: "Cart is empty", severity: "error" });
        return;
      }

      // Final order placement (already handled in placeOrder inside CheckoutForm if needed)
      dispatch({ type: "CLEAR_CART" });
      setSnackbar({ open: true, message: "Payment successful! Order placed.", severity: "success" });
    } catch (err) {
      setSnackbar({ open: true, message: err.data?.message || "Failed to place order", severity: "error" });
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="w-full">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          cart={cart}
          totalPrice={totalPrice}
          onPaymentSuccess={handlePaymentSuccess}
          setSnackbar={setSnackbar}
        />
      </Elements>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Checkout;

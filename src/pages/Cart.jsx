

// import React, { useMemo, useState } from "react";
// import { useCart } from "../context/CartContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { Snackbar, Alert } from "@mui/material";
// import { usePlaceOrderMutation } from "../services/orderApi";
// import { useCreatePaymentIntentMutation } from "../services/paymentApi";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// // Initialize Stripe
// const stripePromise = loadStripe(
//   "pk_test_51SesVSEYQpJvQJZbFnkv799jQDfdpCTm2vF4ZGpbMf3nBSDqD6zegZcBH56kd2at04bzSSMMIPNdUH0ZGr3bKgQj00kkyBtY1q"
// );

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#32325d",
//       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//       fontSmoothing: "antialiased",
//       fontSize: "16px",
//       "::placeholder": { color: "#a0aec0" },
//       padding: "12px 14px",
//     },
//     invalid: { color: "#fa755a", iconColor: "#fa755a" },
//   },
//   hidePostalCode: true,
// };

// // ------------------ Checkout Form ------------------
// const CheckoutForm = ({ totalPrice, onPaymentSuccess, setSnackbar }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [createPaymentIntent] = useCreatePaymentIntentMutation();
//   const [loading, setLoading] = useState(false);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;
//     setLoading(true);

//     try {
//       // Create PaymentIntent on backend
//       const res = await createPaymentIntent(totalPrice).unwrap();
//       const clientSecret = res.clientSecret;

//       //  Confirm payment with Stripe
//       const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: { card: elements.getElement(CardElement) },
//       });

//       if (error) {
//         setSnackbar({ open: true, message: error.message, severity: "error" });
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent.status === "succeeded") {
//         //  send paymentIntent to parent
//         onPaymentSuccess(paymentIntent);
//       }
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: "Payment failed", severity: "error" });
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handlePayment} className="mt-6 p-6 border rounded shadow-md bg-white w-full">
//       <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
//       <CardElement options={CARD_ELEMENT_OPTIONS} className="p-4 border rounded mb-4" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition font-semibold"
//       >
//         {loading ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)}`}
//       </button>
//     </form>
//   );
// };

// // ------------------ Main Cart Component ------------------
// const Cart = () => {
//   const { cart, dispatch } = useCart();
//   const navigate = useNavigate();
//   const [placeOrder] = usePlaceOrderMutation();
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

//   const totalPrice = useMemo(
//     () => cart.reduce((total, item) => total + Number(item.price) * (item.quantity || 1), 0),
//     [cart]
//   );

//   const handleSnackbarClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handlePaymentSuccess = async (paymentIntent) => {
//     try {
//       // Format cart items exactly as backend expects
//       const items = cart
//         .filter((i) => i.id || i.productId)
//         .map((i) => ({
//           productId: i.productId || i.id,
//           quantity: i.quantity || 1,
//         }));

//       if (items.length === 0) {
//         setSnackbar({ open: true, message: "Cart is empty", severity: "error" });
//         return;
//       }

//       //  Send payload matching backend
//       await placeOrder({
//         items,                          // must be 'items', not 'cartItems'
//         paymentId: paymentIntent.id,
//         paymentStatus: paymentIntent.status,
//       }).unwrap();

//       setSnackbar({ open: true, message: "Payment successful! Order placed.", severity: "success" });
//       dispatch({ type: "CLEAR_CART" });
//       navigate("/orders");
//     } catch (err) {
//       console.error(err);
//       setSnackbar({ open: true, message: err.data?.message || "Failed to place order", severity: "error" });
//     }
//   };

//   if (cart.length === 0)
//     return (
//       <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
//         <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//         <p className="text-gray-500">Add some products to place an order.</p>

//         <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose}>
//           <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-col gap-6">
//       <h2 className="text-2xl font-bold mb-4">My Cart</h2>

//       {/* Cart Items */}
//       <div className="flex flex-col gap-4">
//         {cart.map((item) => (
//           <div
//             key={item.productId || item.id}
//             className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col md:flex-row justify-between p-4 hover:shadow-md transition"
//           >
//             <div className="flex items-center gap-4 flex-1">
//               <img src={item.image} alt={item.name || item.title} className="w-24 h-24 object-cover rounded" />
//               <div className="flex flex-col gap-1">
//                 <p className="font-semibold text-gray-900">{item.name || item.title}</p>
//                 <p className="text-gray-700">₹{Number(item.price).toFixed(2)}</p>

//                 <div className="flex items-center gap-2 mt-1">
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "DECREMENT_QUANTITY", payload: item.productId || item.id })
//                     }
//                     className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     -
//                   </button>
//                   <span className="px-3 py-1 border rounded">{item.quantity || 1}</span>
//                   <button
//                     onClick={() =>
//                       dispatch({ type: "INCREMENT_QUANTITY", payload: item.productId || item.id })
//                     }
//                     className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end">
//               <button
//                 onClick={() => {
//                   dispatch({ type: "REMOVE_FROM_CART", payload: item.productId || item.id });
//                   setSnackbar({ open: true, message: "Item removed from cart", severity: "info" });
//                 }}
//                 className="bg-gray-200 text-red-400 px-4 py-1 rounded hover:bg-gray-300 transition"
//               >
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Total Price & Stripe Checkout */}
//       <div className="mt-6 flex flex-col md:flex-row gap-6">
//         <p className="text-xl font-bold text-gray-900">Total: ₹{totalPrice.toFixed(2)}</p>
//         <Elements stripe={stripePromise}>
//           <CheckoutForm
//             totalPrice={totalPrice}
//             onPaymentSuccess={handlePaymentSuccess}
//             setSnackbar={setSnackbar}
//           />
//         </Elements>
//       </div>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleSnackbarClose}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default Cart;


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

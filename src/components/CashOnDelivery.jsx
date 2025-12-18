import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { usePlaceOrderMutation } from "../services/orderApi";

const CashOnDelivery = ({ cart, dispatch, navigate }) => {
  const [placeOrder] = usePlaceOrderMutation();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleClose = () => setSnackbar({ ...snackbar, open: false });

  const handleCOD = async () => {
    try {
      const items = cart.map((item) => ({
        productId: item.productId || item.id,
        quantity: item.quantity || 1,
      }));

      if (!items.length) {
        setSnackbar({
          open: true,
          message: "Cart is empty",
          severity: "error",
        });
        return;
      }

      await placeOrder({
        items,
        paymentId: null,
        paymentStatus: "cod",
      }).unwrap();

      dispatch({ type: "CLEAR_CART" });

      setSnackbar({
        open: true,
        message: "Order placed with Cash on Delivery",
        severity: "success",
      });

      navigate("/orders");
    } catch {
      setSnackbar({
        open: true,
        message: "COD order failed",
        severity: "error",
      });
    }
  };

  return (
    <>
      <button
        onClick={handleCOD}
        className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Place Order (Cash on Delivery)
      </button>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity={snackbar.severity} onClose={handleClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CashOnDelivery;

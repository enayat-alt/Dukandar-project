const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/paymentController");

// Route to create Stripe PaymentIntent
router.post("/create-payment-intent", createPaymentIntent);

module.exports = router;

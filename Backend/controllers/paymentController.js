
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Controller to create PaymentIntent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    if (!amount || isNaN(amount)) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert ₹ → paise
      currency: "inr",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // use express.json() instead of body-parser (built-in)

// Test route to check server is alive
app.get('/', (req, res) => {
  res.send('Dukandar backend is running');
});

// API routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

module.exports = app;

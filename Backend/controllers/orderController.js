const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    if (quantity > product.stock) return res.status(400).json({ message: 'Insufficient stock' });

    const totalPrice = quantity * product.price;
    const order = await Order.create({ productId, quantity, totalPrice });

    await product.update({ stock: product.stock - quantity });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ include: Product });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// const Order = require('../models/Order');
// const Product = require('../models/Product');

// // ------------------ CREATE ORDER ------------------
// exports.createOrder = async (req, res) => {
//   const { items } = req.body;
//   const userId = req.user?.id;

//   if (!userId) return res.status(401).json({ message: "User ID is required" });
//   if (!items || !Array.isArray(items) || items.length === 0) {
//     return res.status(400).json({ message: "Items are required" });
//   }

//   try {
//     let totalPrice = 0;
//     const orderItems = [];
//     const outOfStockItems = [];

//     for (const item of items) {
//       const product = await Product.findByPk(item.productId);
//       if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

//       if (product.stock === 0) {
//         outOfStockItems.push(product.name || product.title);
//         continue;
//       }

//       const qty = Math.min(item.quantity, product.stock);
//       const itemTotal = product.price * qty;
//       totalPrice += itemTotal;

//       await product.update({ stock: product.stock - qty });

//       orderItems.push({
//         productId: item.productId,
//         name: product.name || product.title,
//         quantity: qty,
//         price: parseFloat(product.price),
//         total: itemTotal,
//         image: product.image || "",
//       });
//     }

//     if (orderItems.length === 0) {
//       return res.status(400).json({ message: `All items are out of stock: ${outOfStockItems.join(", ")}` });
//     }

//     const order = await Order.create({
//       userId,
//       items: orderItems,
//       totalPrice,
//       status: "pending",
//     });

//     res.status(201).json({
//       message: "Order placed successfully!",
//       order: order.toJSON(),
//       outOfStockItems,
//     });
//   } catch (err) {
//     console.error("Order Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ------------------ GET ORDERS ------------------
// exports.getOrders = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const role = req.user?.role;

//     if (!userId) return res.status(401).json({ message: "Unauthorized" });

//     let orders;
//     if (role === "admin") {
//       // Admin sees all orders
//       orders = await Order.findAll();
//     } else {
//       // Regular user sees only their own orders
//       orders = await Order.findAll({ where: { userId } });
//     }

//     const formattedOrders = orders.map(order => {
//       const o = order.toJSON();
//       if (typeof o.items === "string") o.items = JSON.parse(o.items);
//       return o;
//     });

//     res.json(formattedOrders);
//   } catch (err) {
//     console.error("Get Orders Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ------------------ DELETE ORDER ------------------
// exports.deleteOrder = async (req, res) => {
//   try {
//     const userId = req.user?.id;
//     const role = req.user?.role;
//     const orderId = req.params.id;

//     if (!userId) return res.status(401).json({ message: "Unauthorized" });

//     let order;
//     if (role === "admin") {
//       order = await Order.findByPk(orderId);
//     } else {
//       order = await Order.findOne({ where: { id: orderId, userId } });
//     }

//     if (!order) {
//       return res.status(404).json({ message: "Order not found or not yours" });
//     }

//     // Restore stock for cancelled order
//     const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
//     for (const item of items) {
//       const product = await Product.findByPk(item.productId);
//       if (product) {
//         await product.update({ stock: product.stock + item.quantity });
//       }
//     }

//     await order.destroy();
//     res.json({ message: "Order cancelled and stock restored", id: orderId });
//   } catch (err) {
//     console.error("Delete Order Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };


const Order = require('../models/Order');
const Product = require('../models/Product');

// ------------------ CREATE ORDER ------------------
exports.createOrder = async (req, res) => {
  const { items, paymentId, paymentStatus } = req.body; // receive Stripe info
  const userId = req.user?.id;

  if (!userId) return res.status(401).json({ message: "User ID is required" });
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Items are required" });
  }

  try {
    let totalPrice = 0;
    const orderItems = [];
    const outOfStockItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${item.productId}` });

      if (product.stock === 0) {
        outOfStockItems.push(product.name || product.title);
        continue;
      }

      const qty = Math.min(item.quantity, product.stock);
      const itemTotal = product.price * qty;
      totalPrice += itemTotal;

      await product.update({ stock: product.stock - qty });

      orderItems.push({
        productId: item.productId,
        name: product.name || product.title,
        quantity: qty,
        price: parseFloat(product.price),
        total: itemTotal,
        image: product.image || "",
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: `All items are out of stock: ${outOfStockItems.join(", ")}` });
    }

    // Save order with Stripe payment info
    const order = await Order.create({
      userId,
      items: orderItems,
      totalPrice,
      paymentId: paymentId || null,
      paymentStatus: paymentStatus || "pending",
      status: paymentStatus === "succeeded" ? "paid" : "pending",
    });

    res.status(201).json({
      message: "Order placed successfully!",
      order: order.toJSON(),
      outOfStockItems,
    });
  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------ GET ORDERS ------------------
exports.getOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let orders;
    if (role === "admin") {
      orders = await Order.findAll();
    } else {
      orders = await Order.findAll({ where: { userId } });
    }

    const formattedOrders = orders.map(order => {
      const o = order.toJSON();
      if (typeof o.items === "string") o.items = JSON.parse(o.items);
      return o;
    });

    res.json(formattedOrders);
  } catch (err) {
    console.error("Get Orders Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ------------------ DELETE ORDER ------------------
exports.deleteOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    const role = req.user?.role;
    const orderId = req.params.id;

    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    let order;
    if (role === "admin") {
      order = await Order.findByPk(orderId);
    } else {
      order = await Order.findOne({ where: { id: orderId, userId } });
    }

    if (!order) {
      return res.status(404).json({ message: "Order not found or not yours" });
    }

    // Restore stock for cancelled order
    const items = typeof order.items === "string" ? JSON.parse(order.items) : order.items;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        await product.update({ stock: product.stock + item.quantity });
      }
    }

    await order.destroy();
    res.json({ message: "Order cancelled and stock restored", id: orderId });
  } catch (err) {
    console.error("Delete Order Error:", err);
    res.status(500).json({ message: err.message });
  }
};

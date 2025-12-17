

// const express = require('express');
// const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const router = express.Router();

// // USER → Get only his orders
// router.get('/', authMiddleware, getOrders);

// // ADMIN → Get ALL orders
// router.get('/admin/all', authMiddleware, getOrders);

// router.post('/', authMiddleware, createOrder);
// router.delete('/:id', authMiddleware, deleteOrder);

// module.exports = router;



const express = require('express');
const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); // add this
const router = express.Router();

// ----------------- USER ROUTES -----------------
// User → Get only their orders
router.get('/', authMiddleware, getOrders);

// User → Place order
router.post('/', authMiddleware, createOrder);

// User → Cancel order
router.delete('/:id', authMiddleware, deleteOrder);

// ----------------- ADMIN ROUTES -----------------
// Admin → Get all orders
router.get('/admin/all', authMiddleware, isAdmin, getOrders);

module.exports = router;

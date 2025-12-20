

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

router.get('/', authMiddleware, getOrders);

router.post('/', authMiddleware, createOrder);

router.delete('/:id', authMiddleware, deleteOrder);

// ----------------- ADMIN ROUTES -----------------

router.get('/admin/all', authMiddleware, isAdmin, getOrders);

module.exports = router;

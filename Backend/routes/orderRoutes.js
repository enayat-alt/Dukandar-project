// const express = require('express');
// const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');
// const authMiddleware = require('../middlewares/authMiddleware');
// const router = express.Router();

// router.get('/', authMiddleware, getOrders);
// router.post('/', authMiddleware, createOrder);
// router.delete('/:id', authMiddleware, deleteOrder);

// module.exports = router;


const express = require('express');
const { createOrder, getOrders, deleteOrder } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// USER → Get only his orders
router.get('/', authMiddleware, getOrders);

// ADMIN → Get ALL orders
router.get('/admin/all', authMiddleware, getOrders);

router.post('/', authMiddleware, createOrder);
router.delete('/:id', authMiddleware, deleteOrder);

module.exports = router;

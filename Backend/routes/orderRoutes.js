const express = require('express');
const { createOrder, getOrders } = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getOrders);
router.post('/', authMiddleware, createOrder);

module.exports = router;

const express = require('express');
const { validateCreateOrder, validateOrderId } = require('../../middleware/validate');
const { 
  createOrder, 
  getUserOrders, 
  getOrderById 
} = require('../../controllers/orderController');
const { protect } = require('../../middleware/auth');

const router = express.Router();

// Get user's own orders
router.get("/my-orders", protect, getUserOrders);

// Get a single order
router.get('/getById/:id', protect, validateOrderId, getOrderById);

// Create a new order
router.post('/create', protect, validateCreateOrder, createOrder);

module.exports = router;

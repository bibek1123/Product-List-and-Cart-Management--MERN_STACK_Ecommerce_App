const express = require('express');
const {validateUpdateOrderStatus, validateOrderId } = require('../../middleware/validate');
const { 
  updateOrderStatus, 
  deleteOrder, 
  getOrders, 
} = require('../../controllers/orderController');
const { protectAdmin } = require('../../middleware/auth');

const router = express.Router();

// Get all orders (Admin Only)
router.get('/list', protectAdmin, getOrders);

// Update an existing order (Admin Only)
router.put('/updateById/:id', protectAdmin, validateOrderId, validateUpdateOrderStatus, updateOrderStatus);

// Delete an order (Admin Only)
router.delete('/deleteById/:id', protectAdmin, validateOrderId, deleteOrder);

module.exports = router;

const express = require('express');
const {
  getCart,
  addItemToCart,
  removeItemFromCart
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/cart', protect, getCart);
router.post('/cart', protect, addItemToCart);
router.delete('/cart/:id', protect, removeItemFromCart);

module.exports = router;

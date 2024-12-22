const express = require('express');
const { validateAddToCart, validateRemoveFromCart } = require('../middleware/validate');
const { addToCart, removeFromCart, getCart, updateCart } = require('../controllers/cartController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Get the user's shopping cart
router.get('/getItemList', protect, getCart);

// Add an item to the cart
router.post('/addItem', protect, validateAddToCart, addToCart);

// Update an existing item in the cart
router.put('/updateItem/:itemId', protect, validateAddToCart, updateCart);

// Remove an item from the cart
router.delete('/deleteItem/:itemId', protect, validateRemoveFromCart, removeFromCart);

module.exports = router;

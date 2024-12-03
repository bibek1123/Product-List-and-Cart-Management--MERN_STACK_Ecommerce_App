const express = require('express');
const { validateAddToCart, validateRemoveFromCart } = require('../middleware/validate');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const { isAuthenticated } = require('../middleware/auth'); // assuming you have an isAuthenticated middleware to verify user

const router = express.Router();

// Get the user's shopping cart
router.get('/cart', isAuthenticated, getCart);

// Add an item to the cart
router.post('/cart', isAuthenticated, validateAddToCart, addToCart);

// Remove an item from the cart
router.delete('/cart/:id', isAuthenticated, validateRemoveFromCart, removeFromCart);

module.exports = router;

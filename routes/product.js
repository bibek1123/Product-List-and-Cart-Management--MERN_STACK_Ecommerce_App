const express = require('express');
const { validateCreateProduct, validateUpdateProduct } = require('../middleware/validate');
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById } = require('../controllers/productController');
const { isAdmin } = require('../middleware/auth'); // assuming you have an isAdmin middleware to restrict to admins

const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Get a single product
router.get('/products/:id', getProductById);

// Create a new product (Admin Only)
router.post('/products', isAdmin, validateCreateProduct, createProduct);

// Update an existing product (Admin Only)
router.put('/products/:id', isAdmin, validateUpdateProduct, updateProduct);

// Delete a product (Admin Only)
router.delete('/products/:id', isAdmin, deleteProduct);

module.exports = router;

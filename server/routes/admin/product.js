const express = require('express');
const { validateCreateProduct, validateUpdateProduct } = require('../../middleware/validate');
const { createProduct, updateProduct, deleteProduct } = require('../../controllers/productController');
const { protectAdmin } = require('../../middleware/auth');

const router = express.Router();

// Create a new product (Admin Only)
router.post('/create', protectAdmin, validateCreateProduct, createProduct);

// Update an existing product (Admin Only)
router.put('/updateById/:id', protectAdmin, validateUpdateProduct, updateProduct);

// Delete a product (Admin Only)
router.delete('/deleteById/:id', protectAdmin, deleteProduct);

module.exports = router;

const express = require('express');
const { getProducts, getProductById } = require('../../controllers/productController');

const router = express.Router();

// Get all products
router.get('/list', getProducts);

// Get a single product
router.get('/getById/:id', getProductById);

module.exports = router;

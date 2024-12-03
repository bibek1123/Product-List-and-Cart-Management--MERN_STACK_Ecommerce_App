const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protectAdmin } = require('../middleware/auth');
const router = express.Router();

router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', protectAdmin, createProduct);
router.put('/products/:id', protectAdmin, updateProduct);
router.delete('/products/:id', protectAdmin, deleteProduct);

module.exports = router;

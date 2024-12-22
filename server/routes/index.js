const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const userProductRoutes = require('./user/product');
const adminProductRoutes = require('./admin/product');
const cartRoutes = require('./cart');
const userOrderRoutes = require('./user/order')
const adminOrderRoutes = require('./admin/order')

router.use('/auth', authRoutes);
router.use('/user/product', userProductRoutes);
router.use('/admin/product', adminProductRoutes);
router.use('/cart', cartRoutes);
router.use('/user/orders', userOrderRoutes);
router.use('/admin/orders', adminOrderRoutes);

module.exports = router;

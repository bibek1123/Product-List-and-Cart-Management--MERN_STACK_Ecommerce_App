const cartService = require('../services/cartService');

exports.getCart = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user.id);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const cart = await cartService.addItemToCart(req.user.id, req.body.productId, req.body.quantity);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const cart = await cartService.removeItemFromCart(req.user.id, req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

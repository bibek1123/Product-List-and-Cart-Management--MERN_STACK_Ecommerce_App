const Cart = require("../models/cart");
const Product = require("../models/product");

// Get User Cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate({
      path: "items.productId",
      match: { deletedAt: null }, // Include only non-deleted products
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out items with null productId (products that were deleted)
    cart.items = cart.items.filter((item) => item.productId);

    if (cart.items.length === 0) {
      return res.status(200).json({ message: 'Cart is empty', items: []});
    }

    // Recalculate total price based on the current product prices and quantities
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.productId.price * item.quantity;
    }, 0);

    res.status(200).json({message:"Cart retrieved successfully", cart});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add Item to Cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.deletedAt) {
      return res
        .status(400)
        .json({ message: "Product is no longer available" });
    }

    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ message: "Quantity exceeds available stock" });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [], totalPrice: 0 });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity, price: product.price });
    }

    // Deduct stock from the product
    product.stock -= quantity;
    await product.save();

    // Update the cart's total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();
    res.status(200).json({message: 'Item added to cart successfully',cart});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Item to Cart
exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findOne({ _id: productId, deletedAt: null });
    if (!product) {
      return res.status(404).json({ message: 'Product not found or is deleted' });
    }

    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex === -1) {
      // If the item does not exist in the cart
      return res.status(404).json({ message: 'Product not in cart' });
    }

    // Update quantity or remove the item
    if (quantity > 0) {
      // Ensure stock is sufficient
      if (quantity > product.stock) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      cart.items[itemIndex].quantity = quantity;
    } else {
      // Remove the item if quantity is 0
      cart.items.splice(itemIndex, 1);
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({message: 'Cart updated successfully', cart});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Remove Item from Cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items.splice(itemIndex, 1); // Remove the item from the cart

    // Recalculate totalPrice
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    await cart.save();

    if (cart.items.length === 0) {
      return res.status(200).json({
        message: "Item removed. Cart is now empty.",
        cart,
      });
    }

    res.status(200).json({
      message: "Item removed from cart successfully",
      cart,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


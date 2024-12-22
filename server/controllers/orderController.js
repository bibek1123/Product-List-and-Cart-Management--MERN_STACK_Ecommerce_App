const Order = require("../models/order");
const Product = require("../models/product");

// Create a new order
exports.createOrder = async (req, res) => {
  const { products } = req.body;
  try {
    // Check if any products are soft-deleted
    const productIds = products.map((item) => item.productId);
    const productList = await Product.find({
      _id: { $in: productIds },
      deletedAt: null,
    });

    // Ensure all products are found and not deleted
    if (productList.length !== products.length) {
      return res
        .status(404)
        .json({ message: "Some products are either not found or deleted" });
    }

    // Check if there are any active orders with soft delete
    const existingOrder = await Order.findOne({
      userId: req.user._id,
      deletedAt: null,
    });
    if (existingOrder) {
      return res.status(400).json({ message: "Active order already exists" });
    }

    // Calculate total order amount
    let totalAmount = 0;
    for (let i = 0; i < products.length; i++) {
      const product = productList.find(
        (p) => p._id.toString() === products[i].productId
      );
      totalAmount += product.price * products[i].quantity;
    }

    // Create the order
    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalAmount,
    });

    const order = await newOrder.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all orders (Admin Only)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ deletedAt: null })
      .populate("userId")
      .populate("products.productId");
    res.status(200).json({message: "Orders retrieved successfully", orders});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.user._id,
      deletedAt: null,
    }).populate("products.productId");
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }
    res.status(200).json({message: "Orders retrieved successfully", orders});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, deletedAt: null })
      .populate("userId")
      .populate("products.productId");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({message: "Order retrieved successfully", order});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update the status of an order (Admin Only)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const order = await Order.findOne({ _id: id, deletedAt: null });
    if (!order) {
      return res.status(404).json({ message: "Order not found or is deleted" });
    }

    // Ensure status is one of the allowed values
    if (!["Pending", "Confirmed", "Cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    const updatedOrder = await order.save();
    res
      .status(200)
      .json({ message: "Order status updated successfully", updatedOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete an order (Soft Delete)
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, deletedAt: null });
    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found or already deleted" });
    }

    // Perform soft delete by setting the deletedAt field
    order.deletedAt = new Date();
    await order.save();

    res.status(200).json({ message: "Order soft-deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number,required: true, min:1 },
      price: { type: Number, required: true, min:0 }, 
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: 'Pending',
  },
  deletedAt: {
    type: Date,
    default: null, // Null if the order is not deleted
  },
},{ timestamps: true });


// Middleware to calculate totalAmount before saving
orderSchema.pre("save", function (next) {
  this.totalAmount = this.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
  next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;

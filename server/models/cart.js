const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min:1 },
    price: {
      type: Number,
      required: true, // Store the price at the time of adding
    },
  }],
  deletedAt: {
    type: Date,
    default: null, // Null if the order is not deleted
  },
},  { timestamps: true });

// Virtual field to dynamically calculate the total price
cartSchema.virtual('calculatedTotalPrice').get(function() {
  return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
});

cartSchema.pre('save', function(next) {
  // Before saving, update the totalPrice field to reflect the total calculation
  this.totalPrice = this.calculatedTotalPrice;
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

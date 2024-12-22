const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim:true, unique:true },
  description: { type: String, required: true, trim:true },
  price: { type: Number, required: true, min:0 },
  image: {
    type: String,
    required: true, // URL or file path of the product image
  },
  category: {
    type: String,
    required: false, // Optional: Can categorize products (e.g.,Cake)
    trim: true,
  },
  stock: { type: Number, required: true, min:0 },
  deletedAt: {
    type: Date,
    default: null, // Null if the order is not deleted
  },
  
},  { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

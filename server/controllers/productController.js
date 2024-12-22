const Product = require('../models/product');

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    let limit = parseInt(req.query.limit) || 10
    let skip = parseInt(req.query.skip) || 0
    const products = await Product.find({deletedAt:null}).limit(limit).skip(skip);
    if (!products.length) {
      return res.status(200).json({ message: 'No Products found', products: [] });
    }
    res.status(200).json({message: 'Products retrieved successfully', products});
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findById(_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({message: 'Product retrieved successfully', product});
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Product (Admin Only)
exports.createProduct = async (req, res) => {
  const { name, description, price, image, category, stock } = req.body;
  try {
    const existingProduct = await Product.findOne({name})
    if (existingProduct && existingProduct.deletedAt) {
      return res.status(400).json({ message: 'Product with this name has been deleted. Reactivate it instead.' });
    }
    if (existingProduct && !existingProduct.deletedAt) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }
    const newProduct = new Product({ name, description, price, image, category, stock });
    await newProduct.save();
    res.status(201).json({message: 'Product created successfully', newProduct});
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Product (Admin Only)
exports.updateProduct = async (req, res) => {
  const { _id } = req.params;
  const {  name, description, price, image, category, stock } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(_id, { name, description, price, image, category, stock }, { new: true });
    if (!updatedProduct || updatedProduct.deletedAt !== null) {
      return res.status(404).json({ message: 'Product not found or is deleted' });
    }
    res.status(200).json({message: "Product updated successfully",updatedProduct });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(_id);
    if (!deletedProduct || deletedProduct.deletedAt !== null) {
      return res.status(404).json({ message: 'Product not found or is already deleted' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' });
  }
};

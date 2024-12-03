const Product = require('../models/product');

exports.getProducts = async () => {
  return await Product.find();
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error('Product not found');
  return product;
};

exports.createProduct = async (productData) => {
  const { name, description, price, stock } = productData;
  const product = new Product({ name, description, price, stock });
  await product.save();
  return product;
};

exports.updateProduct = async (id, updateData) => {
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!product) throw new Error('Product not found');
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error('Product not found');
};

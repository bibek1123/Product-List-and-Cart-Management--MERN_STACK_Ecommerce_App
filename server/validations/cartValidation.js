const Joi = require('joi');

// Add to Cart Validation
const addToCartSchema = Joi.object({
  productId: Joi.string().required(), // Assuming productId is a string (MongoDB ObjectId)
  quantity: Joi.number().integer().min(1).required(),
});

// Remove from Cart Validation
const removeFromCartSchema = Joi.object({
  productId: Joi.string().required(),
});

module.exports = { addToCartSchema, removeFromCartSchema };

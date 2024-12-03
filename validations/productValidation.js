const Joi = require('joi');

// Product Creation Validation
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().greater(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

// Product Update Validation
const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10).max(500),
  price: Joi.number().greater(0),
  stock: Joi.number().integer().min(0),
});

module.exports = { createProductSchema, updateProductSchema };

const Joi = require('joi');

// Product Creation Validation
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  price: Joi.number().greater(0).required(),
  image: Joi.string().uri().required(),
  category:Joi.string().optional(),
  stock: Joi.number().integer().min(0).required(),
});

module.exports = { createProductSchema };

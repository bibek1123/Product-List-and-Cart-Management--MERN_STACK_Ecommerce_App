const Joi = require('joi');

// Order Creation Validation
const createOrderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required().regex(/^[a-fA-F0-9]{24}$/).messages({
          "string.pattern.base": "Invalid product ID format",
        }),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one product is required",
    }),
  totalAmount: Joi.number().required().min(0).messages({
    "number.min": "Total amount must be at least 0",
  }),
});

// Validation for updating order status
const updateOrderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("Pending", "Confirmed", "Cancelled")
    .required(),
});

// Validation for order ID
const orderIdSchema = Joi.object({
  id: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required().messages({
    "string.pattern.base": "Invalid order ID format",
  }),
});

module.exports = {
  createOrderSchema,
  updateOrderStatusSchema,
  orderIdSchema,
};

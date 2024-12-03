const { registerSchema, loginSchema } = require('../validations/authValidation');
const { createProductSchema, updateProductSchema } = require('../validations/productValidation');
const { addToCartSchema, removeFromCartSchema } = require('../validations/cartValidation');

// Generic validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

// Export validation functions for different routes
module.exports = {
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema),
  validateCreateProduct: validate(createProductSchema),
  validateUpdateProduct: validate(updateProductSchema),
  validateAddToCart: validate(addToCartSchema),
  validateRemoveFromCart: validate(removeFromCartSchema),
};

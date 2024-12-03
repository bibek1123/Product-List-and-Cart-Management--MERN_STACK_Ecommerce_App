const express = require('express');
const { validateRegister, validateLogin } = require('../middleware/validate');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// Register a new user
router.post('/register', validateRegister, register);

// Login an existing user
router.post('/login', validateLogin, login);

module.exports = router;

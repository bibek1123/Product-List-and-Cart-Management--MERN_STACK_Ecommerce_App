const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // Import the DB connection logic
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();  // Call the function to connect to the database

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

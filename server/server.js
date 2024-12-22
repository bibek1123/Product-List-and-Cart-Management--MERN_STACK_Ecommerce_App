const express = require("express");
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const indexRoutes = require('./routes/index');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use routes
app.use('/api/v1', indexRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

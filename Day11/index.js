const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./auth');

const app = express();
app.use(express.json());

// Connect DB
connectDB();

// Use Auth Routes
app.use('/auth', authRoutes);

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});

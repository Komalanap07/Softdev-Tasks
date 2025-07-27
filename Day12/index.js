const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./auth');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();
app.use('/auth', authRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});

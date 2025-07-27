const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/SDEtasks');
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB error ❌", err);
  }
};

module.exports = connectDB;

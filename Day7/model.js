// userModel.js
const mongoose = require('mongoose');

// Step 1: Define Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Step 2: Create Model
const User = mongoose.model('User', userSchema);

module.exports = User;

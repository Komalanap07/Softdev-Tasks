const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://localhost:27017/SDEtasks')
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error ❌", err));

// Schema + Model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

// Routes

// GET all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// POST create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// PUT update user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).send("User not found");
  res.json(user);
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).send("User not found");
  res.send("User deleted");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});

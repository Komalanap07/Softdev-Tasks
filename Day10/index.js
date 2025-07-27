const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/SDEtasks')
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error ❌", err));

// ===== Schema 1: User =====
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// ===== Schema 2: Blog Post =====
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Post = mongoose.model('Post', postSchema);

// ==== USER ROUTES ====

// Create user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ==== POST ROUTES ====

// Create post
app.post('/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.status(201).json(post);
});

// Get all posts (with author details)
app.get('/posts', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

// Get single post by ID
app.get('/posts/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author');
  if (!post) return res.status(404).send("Post not found");
  res.json(post);
});

// Update a post
app.put('/posts/:id', async (req, res) => {
  const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).send("Post not found");
  res.json(updated);
});

// Delete a post
app.delete('/posts/:id', async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).send("Post not found");
  res.send("Post deleted");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000 🚀");
});

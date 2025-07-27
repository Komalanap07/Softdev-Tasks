const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./model');
const router = express.Router();

// Register user
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send('User already exists');

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: "User registered ✅", user: { name, email } });
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send("Incorrect password");

    res.send("Login successful ✅");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

module.exports = router;

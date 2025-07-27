const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./model');
const router = express.Router();
require('dotenv').config();

// In-memory refresh token storage (use DB in real apps)
let refreshTokens = [];

// Generate Tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  refreshTokens.push(refreshToken);
  return { accessToken, refreshToken };
};

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const exist = await User.findOne({ email });
  if (exist) return res.status(400).send("User already exists");
  const user = new User({ name, email, password });
  await user.save();
  res.status(201).json({ message: "Registered successfully ✅" });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).send("Invalid password");

  const tokens = generateTokens(user);
  res.json({ message: "Login successful", ...tokens });
});

// TOKEN REFRESH
router.post('/token', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).send("Invalid refresh token");
  }

  try {
    const userData = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: userData.id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).send("Invalid refresh token");
  }
});

// LOGOUT
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  res.send("Logged out ✅");
});

module.exports = router;

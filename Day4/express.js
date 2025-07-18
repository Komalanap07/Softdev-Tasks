// Import express
const express = require('express');

// This is an express app where we put all express object into app
const app = express();


const PORT = 3000;

// Basic Route
app.get('/', (req, res) => {
  res.send('Hello, Welcome to Express.js!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

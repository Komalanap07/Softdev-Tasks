// Middleware functions are functions that have access to the req, res, and next objects.
//  They are used to =>
// Execute code
// Modify req and res
// End request-response cycle
// Call the next middleware
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.url}`);
  next();
});
app.get("/home",(req,res)=>{
    console.log(req.url);
    res.send("This is a home route");
})
// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send('Something wrong');
});
// app.use method can access get post put routes
// next is used to call next middleware

// Server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

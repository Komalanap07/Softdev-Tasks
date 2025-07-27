// index.js
const connectDB = require('./db');
const User = require('./model');

const startApp = async () => {
  await connectDB();

  // Create a new user
  const newUser = new User({
    name: 'Komal Anap',
    email: 'komal@example.com',
    age: 22
  });

  try {
    const savedUser = await newUser.save();
    console.log('User saved successfully:', savedUser);
  } catch (error) {
    console.error('Error saving user:', error.message);
  }

  // Fetch all users
  const allUsers = await User.find();
  console.log('All Users:', allUsers);
};

startApp();

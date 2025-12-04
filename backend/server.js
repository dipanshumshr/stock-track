// backend/server.js

// 1. Import the libraries we need
require('dotenv').config(); // Loads variables from .env file
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stockRoutes = require('./routes/stock.routes');

// 2. Create an instance of an Express server
const app = express();

// 3. Set the port for our server
const PORT = 5000;

// 4. Add middleware to our server
app.use(cors()); // Allows cross-origin requests (from your frontend)
app.use(express.json()); // Allows the server to understand incoming JSON data

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

//The add stock Route
  app.use('/api/stock', stockRoutes);

// 5. THE LOGIN ENDPOINT
// This is where your frontend will send its POST request
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt received:', req.body);

  // Get the username and password from the request body
  const { username, password } = req.body;

  // Get the correct credentials from our .env file
  const correctUsername = process.env.CORRECT_USERNAME;
  const correctPassword = process.env.CORRECT_PASSWORD;

  // Check if the provided credentials are correct
  if (username === correctUsername && password === correctPassword) {
    // If they are correct, send a success response
    res.status(200).json({
      success: true,
      message: 'Login successful!',
    });
  } else {
    // If they are incorrect, send a failure response
    res.status(401).json({
      success: false,
      message: 'Invalid username or password.',
    });
  }
});

// 6. Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
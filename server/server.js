const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
const campaignRoutes = require('./routes/campaignRoutes');
const messageRoutes = require('./routes/messageRoutes');
const profileRoutes = require('./routes/profileRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); 

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api', messageRoutes);
app.use('/api/profiles', profileRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'OutFlo API is running' });
});

// Define port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
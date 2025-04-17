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

// CORS configuration
const corsOptions = {
  origin: ['https://outflo-io-assignment-oyxp.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
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
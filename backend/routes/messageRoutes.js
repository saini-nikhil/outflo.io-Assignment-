const express = require('express');
const router = express.Router();
const { generatePersonalizedMessage } = require('../controllers/messageController');

// LinkedIn message generation route
router.post('/personalized-message', generatePersonalizedMessage);

module.exports = router;
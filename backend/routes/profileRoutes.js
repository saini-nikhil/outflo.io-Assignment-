const express = require('express');
const router = express.Router();
const { 
  getProfiles,
  scrapeProfiles,
  searchProfiles
} = require('../controllers/profileController');

// Profile routes
router.get('/', getProfiles);
router.post('/scrape', scrapeProfiles);
router.post('/search', searchProfiles);

module.exports = router;
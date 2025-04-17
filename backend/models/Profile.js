const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    default: ''
  },
  company: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  profileUrl: {
    type: String,
    required: true,
    unique: true
  },
  scrapedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
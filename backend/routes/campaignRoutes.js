const express = require('express');
const router = express.Router();
const { 
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');

// Campaign routes
router.get('/', getCampaigns);
router.get('/:id', getCampaign);
router.post('/', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;
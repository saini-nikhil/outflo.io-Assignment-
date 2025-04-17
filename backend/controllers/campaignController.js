const Campaign = require('../models/Campaign');

// Get all campaigns (excluding DELETED)
const getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: { $ne: 'DELETED' } });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single campaign by ID
const getCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    if (campaign.status === 'DELETED') {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { name, description, status, leads, accountIDs } = req.body;
    
    const campaign = new Campaign({
      name,
      description,
      status: status || 'ACTIVE',
      leads: leads || [],
      accountIDs: accountIDs || []
    });
    
    const savedCampaign = await campaign.save();
    res.status(201).json(savedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update campaign details
const updateCampaign = async (req, res) => {
  try {
    const { name, description, status, leads, accountIDs } = req.body;
    
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    if (campaign.status === 'DELETED') {
      return res.status(403).json({ error: 'Cannot update a deleted campaign' });
    }
    
    // Only allow ACTIVE or INACTIVE for status updates
    if (status && !['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({ error: 'Status must be either ACTIVE or INACTIVE' });
    }
    
    campaign.name = name || campaign.name;
    campaign.description = description || campaign.description;
    campaign.status = status || campaign.status;
    campaign.leads = leads || campaign.leads;
    campaign.accountIDs = accountIDs || campaign.accountIDs;
    campaign.updatedAt = Date.now();
    
    const updatedCampaign = await campaign.save();
    res.json(updatedCampaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft delete (set status to DELETED)
const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);
    
    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    
    campaign.status = 'DELETED';
    campaign.updatedAt = Date.now();
    
    await campaign.save();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCampaigns,
  getCampaign,
  createCampaign,
  updateCampaign,
  deleteCampaign
};
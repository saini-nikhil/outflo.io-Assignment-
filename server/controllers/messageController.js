const { generateAIMessage } = require('../utils/aiService');

// Generate personalized outreach message
const generatePersonalizedMessage = async (req, res) => {
  try {
    const { name, job_title, company, location, summary } = req.body;
    
    // Validate required fields
    if (!name || !job_title || !company) {
      return res.status(400).json({ 
        error: 'Name, job_title, and company are required fields' 
      });
    }
    
    // Generate personalized message using AI
    const message = await generateAIMessage(name, job_title, company, location, summary);
    
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  generatePersonalizedMessage
};

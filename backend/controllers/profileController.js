const Profile = require('../models/Profile');
const { scrapeLinkedInProfiles, closeBrowser } = require('../utils/scraper');

// Get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ scrapedAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Trigger LinkedIn profile scraping
const scrapeProfiles = async (req, res) => {
  try {
    const { searchUrl } = req.body;
    
    if (!searchUrl) {
      return res.status(400).json({ error: 'LinkedIn search URL is required' });
    }
    
    // Start the scraping process
    const scrapedProfiles = await scrapeLinkedInProfiles(searchUrl);
    
    // Save profiles to database
    for (const profile of scrapedProfiles) {
      // Use findOneAndUpdate with upsert to avoid duplicates
      await Profile.findOneAndUpdate(
        { profileUrl: profile.profileUrl },
        profile,
        { upsert: true, new: true }
      );
    }
    
    res.json({ 
      message: `Successfully scraped ${scrapedProfiles.length} profiles`,
      profiles: scrapedProfiles 
    });
  } catch (error) {
    // Close browser in case of error
    await closeBrowser();
    res.status(500).json({ error: error.message });
  }
};

// Search for profiles
const searchProfiles = async (req, res) => {
  try {
    const { query } = req.body;
    
    let searchCriteria = {};
    
    if (query) {
      searchCriteria = {
        $or: [
          { fullName: { $regex: query, $options: 'i' } },
          { jobTitle: { $regex: query, $options: 'i' } },
          { company: { $regex: query, $options: 'i' } },
          { location: { $regex: query, $options: 'i' } }
        ]
      };
    }
    
    const profiles = await Profile.find(searchCriteria).sort({ scrapedAt: -1 });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cleanup browser on server shutdown
process.on('SIGTERM', async () => {
  await closeBrowser();
  process.exit(0);
});

process.on('SIGINT', async () => {
  await closeBrowser();
  process.exit(0);
});

module.exports = {
  getProfiles,
  scrapeProfiles,
  searchProfiles
};

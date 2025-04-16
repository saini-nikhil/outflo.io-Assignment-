const puppeteer = require('puppeteer');

let browser = null;
let mainPage = null;

// Initialize browser instance and main page
const initBrowser = async () => {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Create and store the main page
    mainPage = await browser.newPage();
    await mainPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to LinkedIn login on the main page
    console.log('Navigating to LinkedIn login page...');
    await mainPage.goto('https://www.linkedin.com/login', { waitUntil: 'networkidle2' });
    
    console.log('Please log in manually within the browser window...');
    await mainPage.waitForNavigation({ timeout: 60000 });
  }
  return browser;
};

// Scrape LinkedIn profiles using Puppeteer
const scrapeLinkedInProfiles = async (searchUrl) => {
  console.log(`Starting LinkedIn scraping for: ${searchUrl}`);

  try {
    // Get or create browser instance
    await initBrowser();
    
    // Create a new tab
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    console.log('Navigating to search URL...');
    await page.goto(searchUrl, { waitUntil: 'networkidle2' });

    // Wait for the search results to load
    await page.waitForSelector('.reusable-search__result-container', { timeout: 10000 });

    console.log('Extracting profile data...');
    
    // Extract profiles (up to 20)
    const profiles = await page.evaluate(() => {
      const results = [];
      const profileNodes = document.querySelectorAll('.reusable-search__result-container');
      
      // Get up to 20 profiles
      const nodesToProcess = Math.min(profileNodes.length, 20);
      
      for (let i = 0; i < nodesToProcess; i++) {
        const node = profileNodes[i];
        
        // Extract profile information
        const nameElement = node.querySelector('.entity-result__title-text a');
        const roleElement = node.querySelector('.entity-result__primary-subtitle');
        const locationElement = node.querySelector('.entity-result__secondary-subtitle');
        
        if (nameElement) {
          const fullName = nameElement.innerText.trim().split('\n')[0];
          const profileUrl = nameElement.href.split('?')[0]; // Remove query parameters
          
          // Extract job title and company (they're usually combined)
          let jobTitle = '';
          let company = '';
          
          if (roleElement) {
            const roleText = roleElement.innerText.trim();
            const roleMatch = roleText.match(/(.*) at (.*)/);
            
            if (roleMatch && roleMatch.length >= 3) {
              jobTitle = roleMatch[1].trim();
              company = roleMatch[2].trim();
            } else {
              jobTitle = roleText;
            }
          }
          
          const location = locationElement ? locationElement.innerText.trim() : '';
          
          results.push({
            fullName,
            jobTitle,
            company,
            location,
            profileUrl
          });
        }
      }
      
      return results;
    });
    
    console.log(`Extracted ${profiles.length} profiles`);
    
    // Close only the current tab, not the entire browser
    await page.close();
    return profiles;
  } catch (error) {
    console.error('LinkedIn scraping error:', error);
    return []; // Return empty array in case of error
  }
};

// Clean up function to close browser when needed
const closeBrowser = async () => {
  if (mainPage) {
    await mainPage.close();
    mainPage = null;
  }
  if (browser) {
    await browser.close();
    browser = null;
  }
};

module.exports = {
  scrapeLinkedInProfiles,
  closeBrowser
};

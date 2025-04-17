

const axios = require('axios');
require('dotenv').config();

const generateAIMessage = async (name, jobTitle, company, location, summary) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.log('No Gemini API key found, generating fallback message');
      return generateFallbackMessage(name, jobTitle, company, location, summary);
    }

    const prompt = `
      Generate a personalized outreach message to a potential customer.
      
      Person's details:
      - Name: ${name}
      - Job Title: ${jobTitle}
      - Company: ${company}
      - Location: ${location || 'Unknown'}
      - Summary: ${summary || 'N/A'}
      
      Write a brief, friendly outreach message (maximum 3 sentences) introducing OutFlo as an AI outreach tool for sales teams that helps businesses grow by enabling them to book more meetings with customers. Make it personalized based on their role and company, but keep it concise and professional.
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        }
      }
    );

    const message = response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!message) {
      throw new Error('Invalid response structure from Gemini API');
    }

    return message;

  } catch (error) {
    console.error('Error generating AI message:', error.message);
    return generateFallbackMessage(name, jobTitle, company, location, summary);
  }
};

const generateFallbackMessage = (name, jobTitle, company, location) => {
  const messages = [
    `Hi ${name}, I noticed you're working as a ${jobTitle} at ${company}. OutFlo could help your team automate outreach and book more meetings with potential clients - would you be open to a quick demo?`,
    `Hello ${name}! As a ${jobTitle} at ${company}, you might be interested in OutFlo's AI outreach tool that's helping sales teams book more meetings effortlessly. Would you have 15 minutes this week to discuss how we could help?`,
    `Hey ${name}, I came across your profile and thought OutFlo's AI outreach solution would be valuable for ${company}'s sales team. Would you be interested in learning how we're helping similar companies increase meeting bookings by 40%?`
  ];

  return messages[Math.floor(Math.random() * messages.length)];
};

module.exports = {
  generateAIMessage
};


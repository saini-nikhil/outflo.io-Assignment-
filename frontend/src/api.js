const API_BASE_URL =  'https://outflo-io-assignment.vercel.app';

// Campaign API calls
export const getCampaigns = async () => {
  const response = await fetch(`${API_BASE_URL}/api/campaigns`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }
  return response.json();
};

export const getCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign');
  }
  return response.json();
};

export const createCampaign = async (campaignData) => {
  const response = await fetch(`${API_BASE_URL}/api/campaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaignData),
  });
  if (!response.ok) {
    throw new Error('Failed to create campaign');
  }
  return response.json();
};

export const updateCampaign = async (id, campaignData) => {
  const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(campaignData),
  });
  if (!response.ok) {
    throw new Error('Failed to update campaign');
  }
  return response.json();
};

export const deleteCampaign = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/campaigns/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete campaign');
  }
  return response.json();
};

// Message API call
export const generateMessage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/personalized-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in generateMessage:', error);
    throw error;
  }
};

// Profile API calls
export const getProfiles = async () => {
  const response = await fetch(`${API_BASE_URL}/api/profiles`);
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
};

export const scrapeProfiles = async (searchUrl) => {
  const response = await fetch(`${API_BASE_URL}/api/profiles/scrape`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ searchUrl }),
  });
  if (!response.ok) {
    throw new Error('Failed to scrape profiles');
  }
  return response.json();
};

export const searchProfiles = async (query) => {
  const response = await fetch(`${API_BASE_URL}/api/profiles/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) {
    throw new Error('Failed to search profiles');
  }
  return response.json();
};   
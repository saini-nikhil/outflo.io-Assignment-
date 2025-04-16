const API_URL = 'http://localhost:5000/api';

export interface Campaign {
  id?: string;
  name: string;
  subject: string;
  content: string;
  // add other relevant fields
}

export interface Profile {
  _id: string;
  fullName: string;
  jobTitle: string;
  company: string;
  location: string;
  profileUrl: string;
}

export interface ScrapeResponse {
  message: string;
  profiles: Profile[];
}

export interface MessageGeneratorData {
  name: string;
  job_title: string;
  company: string;
  location?: string;
  tone?: string;
  purpose?: string;
}

// Campaign API calls
export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await fetch(`${API_URL}/campaigns`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaigns');
  }
  return response.json();
};

export const getCampaign = async (id: string): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch campaign');
  }
  return response.json();
};

export const createCampaign = async (campaignData: Campaign): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns`, {
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

export const updateCampaign = async (id: string, campaignData: Campaign): Promise<Campaign> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
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

export const deleteCampaign = async (id: string): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/campaigns/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete campaign');
  }
  return response.json();
};

// Message API call
export const generateMessage = async (data: MessageGeneratorData): Promise<{ message: string }> => {
  const response = await fetch(`${API_URL}/personalized-message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to generate message');
  }
  return response.json();
};

// Profile API calls
export const getProfiles = async (): Promise<Profile[]> => {
  const response = await fetch(`${API_URL}/profiles`);
  if (!response.ok) {
    throw new Error('Failed to fetch profiles');
  }
  return response.json();
};

export const scrapeProfiles = async (searchUrl: string): Promise<ScrapeResponse> => {
  const response = await fetch(`${API_URL}/profiles/scrape`, {
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

export const searchProfiles = async (query: string): Promise<Profile[]> => {
  const response = await fetch(`${API_URL}/profiles/search`, {
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

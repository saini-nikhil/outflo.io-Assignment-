// src/pages/MessagePage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import MessageGenerator from '../components/MessageGenerator';

interface ProfileData {
  // Define the structure of profile data here based on what data you expect
  name?: string;
  headline?: string;
  location?: string;
  // Add other fields as necessary
}

const MessagePage: React.FC = () => {
  const location = useLocation();
  const profileData: ProfileData | null = location.state || null;

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">LinkedIn Message Generator</h1>
        <p className="mt-2 text-lg text-gray-600">
          Generate personalized outreach messages based on LinkedIn profile data.
        </p>
      </div>
      
      <MessageGenerator initialData={profileData} />
    </div>
  );
}

export default MessagePage;

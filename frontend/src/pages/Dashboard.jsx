import React from 'react';
import CampaignList from '../components/CampaignList';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg px-6 py-4">
        <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your outreach campaigns and track their performance.
        </p>
      </div>
      <CampaignList />
    </div>
  );
};

export default Dashboard; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';
import { createCampaign } from '../api';

const CampaignCreate = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await createCampaign({
        name: formData.name,
        description: formData.description,
        status: formData.status,
        leads: formData.leads,
        accountIDs: formData.accountIDs
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create campaign. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
            <p className="mt-2 text-lg text-gray-600">
              Set up a new outreach campaign to connect with potential leads.
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg p-6">
        <CampaignForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CampaignCreate; 
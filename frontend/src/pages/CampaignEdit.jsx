import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CampaignForm from '../components/CampaignForm';
import { getCampaign, updateCampaign } from '../api';

const CampaignEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      if (!id) {
        setError('Campaign ID is missing');
        setLoading(false);
        return;
      }

      try {
        const data = await getCampaign(id);
        setCampaign({
          _id: data.id || '',
          name: data.name,
          description: data.description,
          status: data.status,
          leads: data.leads || [],
          accountIDs: data.accountIDs || []
        });
      } catch (err) {
        setError('Failed to load campaign. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleSubmit = async (formData) => {
    if (!id || !campaign) {
      setError('Campaign data is missing');
      return;
    }

    try {
      const apiData = {
        id: campaign._id,
        name: formData.name,
        description: formData.description,
        status: formData.status,
        leads: formData.leads,
        accountIDs: formData.accountIDs
      };
      await updateCampaign(id, apiData);
      navigate('/');
    } catch (err) {
      setError('Failed to update campaign. Please try again.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Campaign not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Campaign</h1>
            <p className="mt-2 text-lg text-gray-600">
              {campaign.name}
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
        <CampaignForm campaign={campaign} onSubmit={handleSubmit} isEditing={true} />
      </div>
    </div>
  );
};

export default CampaignEdit; 
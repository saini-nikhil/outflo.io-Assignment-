import React, { useState, useEffect } from 'react';

const CampaignForm = ({ campaign, onSubmit, isEditing = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'ACTIVE',
    leads: '',
    accountIDs: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name || '',
        description: campaign.description || '',
        status: campaign.status || 'ACTIVE',
        leads: (campaign.leads || []).join('\n'),
        accountIDs: (campaign.accountIDs || []).join('\n')
      });
    }
  }, [campaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const processedData = {
        ...formData,
        leads: formData.leads.split('\n').filter(lead => lead.trim() !== ''),
        accountIDs: formData.accountIDs.split('\n').filter(id => id.trim() !== '')
      };

      await onSubmit(processedData);
    } catch (err) {
      setError('Failed to save campaign. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Campaign Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description*
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        <div>
          <label htmlFor="leads" className="block text-sm font-medium text-gray-700">
            LinkedIn Profile URLs
          </label>
          <div className="mt-1">
            <textarea
              id="leads"
              name="leads"
              value={formData.leads}
              onChange={handleChange}
              rows={5}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/profile-1&#10;https://linkedin.com/in/profile-2"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">One URL per line</p>
        </div>

        <div>
          <label htmlFor="accountIDs" className="block text-sm font-medium text-gray-700">
            Account IDs
          </label>
          <div className="mt-1">
            <textarea
              id="accountIDs"
              name="accountIDs"
              value={formData.accountIDs}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="123&#10;456"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">One ID per line</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <p className="text-sm text-gray-500">* Required fields</p>
        <button
          type="submit"
          disabled={loading}
          className={`
            inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm
            text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
            ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            isEditing ? 'Update Campaign' : 'Create Campaign'
          )}
        </button>
      </div>
    </form>
  );
};

export default CampaignForm;

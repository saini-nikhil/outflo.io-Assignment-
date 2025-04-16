import React, { useState } from 'react';
import { generateMessage, MessageGeneratorData } from '../api';

interface ProfileData {
  name?: string;
  headline?: string;
  location?: string;
  company?: string;
}

interface Props {
  initialData: ProfileData | null;
}

const MessageGenerator: React.FC<Props> = ({ initialData }) => {
  const [formData, setFormData] = useState<MessageGeneratorData>({
    name: initialData?.name || '',
    job_title: initialData?.headline || '',
    company: initialData?.company || '',
    location: initialData?.location || '',
    tone: 'professional',
    purpose: 'networking',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.job_title || !formData.company) {
      setError('Please fill in all required fields: Name, Job Title, and Company');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const result = await generateMessage(formData);
      if (result && result.message) {
        setMessage(result.message);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error generating message:', err);
      setError('Failed to generate message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Recipient's Name*
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
            <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">
              Job Title*
            </label>
            <input
              type="text"
              id="job_title"
              name="job_title"
              value={formData.job_title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company*
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="tone" className="block text-sm font-medium text-gray-700">
              Message Tone
            </label>
            <select
              id="tone"
              name="tone"
              value={formData.tone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
            </select>
          </div>

          <div>
            <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">
              Message Purpose
            </label>
            <select
              id="purpose"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="networking">Networking</option>
              <option value="job">Job Opportunity</option>
              <option value="collaboration">Collaboration</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">* Required fields</p>
          <button
            type="submit"
            disabled={loading}
            className={`
              inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm
              text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors
              ${loading ? 'opacity-75 cursor-not-allowed' : ''}
            `}
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
                Generating...
              </>
            ) : (
              'Generate Message'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {message && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-medium text-gray-900">Generated Message</h2>
          <div className="p-4 rounded-md bg-gray-50 border border-gray-200">
            <p className="whitespace-pre-wrap text-gray-700">{message}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(message)}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm
              font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2
              focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <i className="fas fa-copy mr-1.5"></i>
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;

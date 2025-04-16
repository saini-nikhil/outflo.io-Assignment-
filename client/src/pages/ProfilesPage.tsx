import React from 'react';
import ProfileSearch from '../components/ProfileSearch';

const ProfilesPage: React.FC = () => {
  return (
    <div className="profiles-page">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <i className="fas fa-exclamation-triangle text-yellow-400"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <span className="font-medium">Under Maintenance:</span> Some profile scraping features may be temporarily unavailable due to technical issues. We are working to resolve this as soon as possible.
            </p>
          </div>
        </div>
      </div>
      
      <h1>LinkedIn Profiles</h1>
      <p>Search for LinkedIn profiles or scrape new profiles from LinkedIn search results.</p>
      
      <ProfileSearch />
    </div>
  );
};

export default ProfilesPage;

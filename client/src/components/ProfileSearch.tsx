import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { getProfiles, scrapeProfiles, searchProfiles, Profile, ScrapeResponse } from '../api';
import { Link } from 'react-router-dom';

const ProfileSearch: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchUrl, setSearchUrl] = useState<string>('');
  const [scraping, setScraping] = useState<boolean>(false);
  const [scrapingMessage, setScrapingMessage] = useState<string>('');

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await getProfiles();
      setProfiles(data);
    } catch (err) {
      setError('Failed to load profiles. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await searchProfiles(searchQuery);
      setProfiles(data);
    } catch (err) {
      setError('Failed to search profiles. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrape = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchUrl) {
      setError('Please enter a LinkedIn search URL');
      return;
    }

    try {
      setScraping(true);
      setScrapingMessage('Initiating LinkedIn scraping. Please wait and follow any browser prompts...');
      const result = await scrapeProfiles(searchUrl);
      setScrapingMessage(`Success! Scraped ${result.profiles.length || 0} profiles.`);
      fetchProfiles();
    } catch (err) {
      setError('Failed to scrape profiles. Please try again.');
      console.error(err);
    } finally {
      setScraping(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2 inline-block mb-6">
            LinkedIn Profile Scraper
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Enter a LinkedIn search URL to scrape profiles.
          </p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <i className="fas fa-exclamation-circle mr-2"></i>
              {error}
            </div>
          )}
          {scrapingMessage && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              {scrapingMessage}
            </div>
          )}

          <form onSubmit={handleScrape} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                id="searchUrl"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-600"
                value={searchUrl}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchUrl(e.target.value)}
                placeholder="https://www.linkedin.com/search/results/people/?keywords=..."
                required
              />
              <button
                type="submit"
                disabled={scraping}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  scraping
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-md transform hover:-translate-y-0.5'
                }`}
              >
                {scraping ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Scraping...
                  </span>
                ) : (
                  'Start Scraping'
                )}
              </button>
            </div>
          </form>

          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-8"></div>

          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-500 pb-2 inline-block mb-6">
            Search Profiles
          </h2>
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-600"
                value={searchQuery}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="Search by name, job title, company..."
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-md transform hover:-translate-y-0.5 transition-all"
              >
                Search
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-lg text-gray-600 text-center py-12">
              No profiles found. Try scraping some LinkedIn profiles first.
            </div>
          ) : (
            <>
              <h3 className="text-xl text-gray-600 mb-6">
                Found {profiles.length} profiles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map((profile) => (
                  <div
                    key={profile._id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                          {getInitials(profile.fullName)}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{profile.fullName}</h4>
                          <p className="text-gray-600">{profile.jobTitle}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-building w-5 mr-2 text-blue-500"></i>
                          {profile.company}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="fas fa-map-marker-alt w-5 mr-2 text-blue-500"></i>
                          {profile.location}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={profile.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200 text-center font-medium"
                        >
                          View Profile
                        </a>
                        <Link
                          to="/message"
                          state={{
                            name: profile.fullName,
                            job_title: profile.jobTitle,
                            company: profile.company,
                            location: profile.location
                          }}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 text-center font-medium"
                        >
                          Generate Message
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSearch;

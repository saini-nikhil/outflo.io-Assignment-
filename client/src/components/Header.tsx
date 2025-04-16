import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Campaigns', icon: 'fa-bullhorn' },
    { path: '/message', label: 'Message Generator', icon: 'fa-comment-dots' },
    { path: '/profiles', label: 'LinkedIn Profiles', icon: 'fa-user-circle' }
  ];

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl group-hover:bg-white/20 transition-all duration-200 mr-3 shadow-lg">
                <i className="fas fa-rocket text-2xl text-white/90 group-hover:text-white transform group-hover:rotate-12 transition-all duration-300"></i>
              </div>
              <div>
                <h1 className="text-white text-xl font-bold tracking-wide">LeadFlow</h1>
                <p className="text-indigo-100 text-xs font-medium">Smart Lead Generation</p>
              </div>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map(({ path, label, icon }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  isActivePath(path)
                    ? 'text-white border-b-2 border-white'
                    : 'text-indigo-100 hover:text-white'
                }`}
              >
                <i className={`fas ${icon} mr-2`}></i>
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
              </span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-2 text-base font-medium transition-colors duration-200 ${
                isActivePath(path)
                  ? 'text-white bg-indigo-700'
                  : 'text-indigo-100 hover:text-white hover:bg-indigo-600'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={`fas ${icon} mr-3 w-5`}></i>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;

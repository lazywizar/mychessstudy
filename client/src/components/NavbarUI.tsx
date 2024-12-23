import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarUIProps {
  userName: string;
  isDropdownOpen: boolean;
  onProfileClick: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
}

export const NavbarUI: React.FC<NavbarUIProps> = ({
  userName,
  isDropdownOpen,
  onProfileClick,
  onLogout,
  onEditProfile,
}) => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold">MyChessStudy</span>
            </Link>
            <div className="hidden md:flex items-center space-x-4 ml-10">
              <Link to="/dashboard" className="px-3 py-2 rounded-md hover:bg-gray-700">
                Dashboard
              </Link>
              {/* Add more nav items here */}
            </div>
          </div>

          {/* Profile dropdown */}
          <div className="flex items-center">
            <div className="relative">
              <button
                onClick={onProfileClick}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span>{userName}</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={onEditProfile}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={onLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

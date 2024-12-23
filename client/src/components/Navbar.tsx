import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NavbarUI } from './NavbarUI';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEditProfile = () => {
    setIsDropdownOpen(false);
    navigate('/profile/edit');
  };

  if (!user) return null;

  return (
    <div ref={dropdownRef}>
      <NavbarUI
        userName={user.name}
        isDropdownOpen={isDropdownOpen}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
        onEditProfile={handleEditProfile}
      />
    </div>
  );
};

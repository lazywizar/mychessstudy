import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { EditProfileUI } from './EditProfileUI';
import api from '../utils/axios';

export const EditProfile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await api.patch('/api/auth/profile', { name });
      setUser(response.data.data.user);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Profile update error:', err);
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <EditProfileUI
      name={name}
      email={user.email}
      loading={loading}
      error={error}
      onNameChange={(e) => setName(e.target.value)}
      onSubmit={handleSubmit}
    />
  );
};

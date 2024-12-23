import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from 'contexts/AuthContext';
import { ProtectedRoute } from 'components/ProtectedRoute';
import { LoginForm } from 'components/LoginForm';
import { RegisterForm } from 'components/RegisterForm';
import { Navbar } from 'components/Navbar';
import { EditProfile } from 'components/EditProfile';
import './App.css';

// Root route component that redirects based on auth status
const RootRoute = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  const { user } = useAuth();

  return (
    <div className="App min-h-screen bg-gray-100">
      {user && <Navbar />}
      <Routes>
        {/* Public routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <RegisterForm />
            </PublicRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div className="p-4">Dashboard (Coming Soon)</div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        
        {/* Root route - redirects based on auth status */}
        <Route path="/" element={<RootRoute />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// Public route component that redirects to dashboard if already authenticated
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppWrapper = () => {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
};

export default AppWrapper;

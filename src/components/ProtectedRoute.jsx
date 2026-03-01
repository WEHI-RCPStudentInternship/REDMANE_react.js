import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  console.log('auth state:', {
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    activeNavigator: auth.activeNavigator,
    error: auth.error,
    user: auth.user,
  })

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <Navigate to="/login" />

  if (auth.activeNavigator === 'signinRedirect') return <div>Signing in...</div>;
  if (auth.activeNavigator === 'singoutRedirect') return <div>Signing out...</div>;

  if (!auth.isAuthenticated) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
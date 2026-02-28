import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, error } = useAuth0();


  console.log('protectedroute', { isAuthenticated, isLoading, error });
  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children
};

export default ProtectedRoute;
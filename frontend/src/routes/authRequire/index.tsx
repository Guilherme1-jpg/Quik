import React from 'react';
import useAuth from 'hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

function RequireAuth({ children }: Props) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location || 'dashboard' }} replace />;
  }

  return children;
}

export default RequireAuth;

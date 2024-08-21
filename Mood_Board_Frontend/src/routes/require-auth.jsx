import { Outlet } from 'react-router-dom';
import React from 'react';
import { getBearerToken } from 'services/credential-storage/credential-storage';
import AuthService from 'services/auth-service';

const ProtectedRoute = () => {
  const idToken = getBearerToken();

  if (!idToken) {
    AuthService.doLogin();
  }

  return <Outlet />;
};

export default ProtectedRoute;

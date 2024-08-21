import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Router from './router';

const navigateService = createBrowserRouter([
  {
    path: '*',
    element: (
      <Suspense fallback={<CircularProgress />}>
        <Router />
      </Suspense>
    )
  }
]);

export default navigateService;

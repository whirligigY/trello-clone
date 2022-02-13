import React from 'react';

import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { SignIn } from './components/SignIn';
import { Profile } from './components/Profile';

const routesConfig = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/dashboard/:boardId',
    element: <DashboardPage />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  },
  {
    path: '/profile',
    element: <Profile />
  }
];

export { routesConfig };

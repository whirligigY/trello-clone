import React from 'react';

import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { SignIn } from './components/SignIn';
import { Profile } from './components/Profile';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { NotFound } from './pages/NotFound';

const routesConfig = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/dashboard/:boardId',
    element: <DashboardPage />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export { routesConfig };

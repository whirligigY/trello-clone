import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routesConfig } from './routesConfig';

import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/Auth';
import { supabase } from './client';
import './App.css';

// TODO: change switch to route with history

const App = () => {
  const routes = useRoutes(routesConfig);

  return (
    <AuthProvider supabase={supabase}>
      <div className="wrapper">
        <Header />
        {routes}
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;

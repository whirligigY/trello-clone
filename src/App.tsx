import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { noLoginRoutesConfig } from './no-login-routesConfig';

import { Header } from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/Auth';
import { BgContext } from './contexts/BgContext';
import { supabase } from './client';

import './App.css';

const App = () => {
  const [wrapperBg, setWrapperBg] = useState(
    'https://fyddxppvkwjfodizkufq.supabase.in/storage/v1/object/public/avatars/beautiful.jpeg'
  );
  const routes = useRoutes(routesConfig);

  const noLoginRoute = useRoutes(noLoginRoutesConfig);

  const changeWrapperBg = (newBg: React.SetStateAction<string>) => {
    setWrapperBg(newBg);
  };

  useEffect(() => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/profile'
    ) {
      setWrapperBg(
        'https://fyddxppvkwjfodizkufq.supabase.in/storage/v1/object/public/avatars/beautiful.jpeg'
      );
    }
  }, [window.location.pathname]);

  return (
    <AuthProvider>
      <BgContext.Provider
        value={{
          changeWrapperBg,
        }}
      >
        <div
          className="wrapper"
          style={{ backgroundImage: `url('${wrapperBg}')` }}
        >
          <Header />
          {/*TODO: remove supabase import */}
          {supabase.auth.session()?.user?.aud === 'authenticated'
            ? routes
            : noLoginRoute}
          <Footer />
        </div>
      </BgContext.Provider>
    </AuthProvider>
  );
};

export default App;

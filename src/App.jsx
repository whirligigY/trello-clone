import React, {useState, useEffect} from 'react';
import { useRoutes } from 'react-router-dom';
import { routesConfig } from './routesConfig';

import { Header } from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './contexts/Auth';
import { BgContext } from './contexts/BgContext';
import { supabase } from './client';
import './App.css';

// TODO: change switch to route with history

const App = () => {
  const [wrapperBg, setWrapperBg] = useState('https://fyddxppvkwjfodizkufq.supabase.in/storage/v1/object/public/avatars/beautiful.jpeg')
  const routes = useRoutes(routesConfig);

  const changeWrapperBg = (newBg) => {
    setWrapperBg(newBg);
  }

  useEffect(()=>{
    if (window.location.pathname === '/' || window.location.pathname === '/profile') {
      setWrapperBg('https://fyddxppvkwjfodizkufq.supabase.in/storage/v1/object/public/avatars/beautiful.jpeg')
    }
  }, [window.location.pathname])

  return (
    <AuthProvider supabase={supabase}>
      <BgContext.Provider value={{
        changeWrapperBg
      }}>
        <div className="wrapper"
        style={{ backgroundImage: `url('${wrapperBg}')` }}>
          <Header />
          {routes}
          <Footer />
        </div>
      </BgContext.Provider>
    </AuthProvider>
  );
};

export default App;

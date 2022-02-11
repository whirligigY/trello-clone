import React from 'react';
import './App.css';

import Header from './components/Header';

import Footer from './components/Footer';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { HomePage } from './pages/HomePage';
import { createBrowserHistory } from 'history';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import { AuthProvider, useAuth } from './contexts/Auth';
import { supabase } from './client';

//TODO: change switch to route with history
/**
 *
 **/

const App = (props) => {
  // const newHistory = createBrowserHistory();
  console.log(props);
  return (
    <BrowserRouter>
      <AuthProvider supabase={supabase}>
        <div className="wrapper">
          <Header />
          {/* <Router history={newHistory}> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/profile" component={Profile} />
            <Route path="/sign-in" component={SignIn} />
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

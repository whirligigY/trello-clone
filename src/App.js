
import React, { useState } from 'react'
import './App.css'

import Header from './components/Header'

import Footer from './components/Footer'
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  Redirect
} from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { HomePage } from './pages/HomePage'
import { createBrowserHistory } from 'history'
import SignIn from './components/SignIn'
import Profile from './components/Profile'
import { AuthProvider } from './contexts/Auth'
import { supabase } from './client'


//TODO: change switch to route with history
/**
 *
 **/

const App = (props) => {
  // const newHistory = createBrowserHistory();

  const [boardId, setBoardId] = useState(null)
  const handleBoardIdChange = (id) => {
    setBoardId(id)
  }
  return (
    <BrowserRouter>
      <AuthProvider supabase={supabase}>
        <div className="wrapper">
          <Header />
          {/* <Router history={newHistory}> */}
          <Switch>

            <Route
              exact
              path="/"
              render={(props) => (
                <HomePage
                  handleBoardIdChange={handleBoardIdChange}
                  {...props}
                />
              )}
            />

            <Route
              path="/dashboard"
              render={() => <DashboardPage boardId={boardId} />}
            />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
            {/* <Redirect from="/dashboard" to="/dashboard/:dashboardId" /> */}

          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

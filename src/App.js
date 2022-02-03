import React from "react";
import "./App.css";
import Header from "./components/Header";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { createBrowserHistory } from "history";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import { AuthProvider } from "./contexts/Auth";

//TODO: change switch to route with history
/**
 *
 **/

const App = () => {
  // const newHistory = createBrowserHistory();
  console.log(`App.js loaded`, AuthProvider);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="wrapper">
          <Header />
          <Aside />
          {/* <Router history={newHistory}> */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/profile" component={Profile} />
          </Switch>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

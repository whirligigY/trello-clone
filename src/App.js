import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
//import { createBrowserHistory } from "history";

const App = () => {
  //const newHistory = createBrowserHistory();

  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header />
        <Switch>
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route exact path="/" component={HomePage} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { BrowserRouter, Route, Router } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer";
import { createBrowserHistory } from "history";

const App = () => {
  const newHistory = createBrowserHistory();

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Router history={newHistory}>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Router>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

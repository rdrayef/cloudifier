import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu from "./components/Menu/Menu";
function App() {
  return (
    <Router>
      <ToastContainer />
      <Menu />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Home} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

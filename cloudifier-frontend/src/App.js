import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <ToastContainer />
      {/* <Menu /> */}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

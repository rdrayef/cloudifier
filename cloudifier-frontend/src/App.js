import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MachinesPage from "./pages/MachinesPage";
import "./App.css";
import LoginForm from "./components/Forms/LoginForm";
import Dashboard from "./pages/Dashboard";
import MachineTest from "./pages/MachineTest";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      {/* <Menu /> */}
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

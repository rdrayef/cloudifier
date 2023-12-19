import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import MachinesPage from "./pages/MachinesPage";
import "./App.css";
import LoginForm from "./components/Forms/LoginForm";
import Navbar from "./components/Layouts/Navbar";
import Dashbored from "./pages/Dashboard";
import useProxmox from "./config/Store";

function App() {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const setIsAuth = useProxmox((state) => state.setIsAuth);
  useEffect(() => {
    async function connect() {
      const res = await proxmoxClient.connect("root@pam", "sayih");
      setIsAuth(res);
    }
    connect();
  }, []);

  return (
    <Router>
      {/* <Menu /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/machines" component={MachinesPage} />
        <Route path="/login" component={LoginForm} />
        <Route path="*" component={Dashbored} />
      </Switch>
    </Router>
  );
}

export default App;

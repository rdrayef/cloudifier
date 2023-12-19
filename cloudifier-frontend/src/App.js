import React, { useEffect } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MachinesPage from "./pages/MachinesPage";
import "./App.css";
import LoginForm from "./components/Forms/LoginForm";
import Dashboard from "./pages/Dashboard";
import useProxmox from "./config/Store";
import MachineTest from "./pages/MachineTest";

function App() {
  const proxmoxClient = useProxmox((state) => state.proxmoxClient);
  const setIsAuth = useProxmox((state) => state.setIsAuth);
  useEffect(() => {
    async function connect() {
      const res = await proxmoxClient.connect("root@pam", "rootroot");
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
        <Route path="/test" component={MachineTest} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

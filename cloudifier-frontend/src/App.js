import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Menu from './components/Menu/Menu';
import MachinesPage from './pages/MachinesPage';
import './App.css';

function App() {
    return (
        <Router>
          <div>
            <Menu />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/machines" component={MachinesPage} />
            </Switch>
          </div>
        </Router>
      );
}

export default App
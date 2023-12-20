import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Import your CSS file
import LoginForm from "../Forms/LoginForm";

const Menu = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);


  const toggleLoginForm = () => {
    console.log("Login Page");
    setShowLoginForm(!showLoginForm);
  };

  const toggleServicesMenu = () => {
    setShowServicesMenu(!showServicesMenu);
  };

  return (
    <nav className="nav-bar-ctr">
      <div>
        <div>
          <img src="images/logo.png" />
        </div>
      </div>

      <div>
        <Link to="/" className="menu-link">
          Home
        </Link>
        <Link to="/machines" className="menu-link">
          Machines
        </Link>
        <span className="menu-link" onClick={toggleServicesMenu}>
          Services
          {showServicesMenu && (
            <div className="submenu">
              <Link to="/storage" className="submenu-link">
                Storage
              </Link>
              <Link to="/database" className="submenu-link">
                Database
              </Link>
              {/* Add other service links */}
            </div>
          )}
        </span>
        <Link to="/storage" className="menu-link">
          About us
        </Link>
      </div>

      <div>
        <span onClick={toggleLoginForm}>Login</span>
        {showLoginForm && <LoginForm toggleLoginForm={toggleLoginForm} />}
      </div>
    </nav>
  );
};

export default Menu;

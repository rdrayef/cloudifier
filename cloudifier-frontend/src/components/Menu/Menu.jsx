import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Import your CSS file
import LoginForm from "../Forms/LoginForm";

const Menu = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleLoginForm = () => {
    console.log("Login Page");
    setShowLoginForm(!showLoginForm);
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
        <Link to="/storage" className="menu-link">
          Storage
        </Link>
        <Link to="/database" className="menu-link">
          Database
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

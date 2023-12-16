import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css"; // Import your CSS file

const Menu = () => {
  return (
    <div className="menu">
      <div className="logo">
        <img src="images/CloudFire.png" />
      </div>
      <div className="items">
        <ul>
          <li>
            <Link to="/" className="menu-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/machines" className="menu-link">
              Machines
            </Link>
          </li>
          <li>
            <Link to="/storage" className="menu-link">
              Storage
            </Link>
          </li>
          <li>
            <Link to="/database" className="menu-link">
              Database
            </Link>
          </li>
          {/* Add more menu items with corresponding routes */}
        </ul>
      </div>
      <div className="login">
        <span>Login</span>
      </div>
    </div>
  );
};

export default Menu;

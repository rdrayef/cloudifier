import React, { useState } from "react";
import { NavLink  } from "react-router-dom";
import "./Menu.css"; // Import your CSS file
import LoginForm from "../Forms/LoginForm";
import useProxmox from "../../config/Store";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cookies from "universal-cookie";

const Menu = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const isAuth = useProxmox((state) => state.isAuth)
  const cookies = new Cookies();

  const toggleLoginForm = () => {
    console.log("Login Page");
    setShowLoginForm(!showLoginForm);
  };

  const handleLogout = () => {
    cookies.remove('PVEAuthCookie');
    cookies.remove('CSRFPreventionToken');
    document.location.href = '/login'
  }
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
        <NavLink  to="/" className="menu-link">
          Home
        </NavLink >
        <NavLink  to="/machines" className="menu-link">
          Machines
        </NavLink >
        <span className="menu-link" onClick={toggleServicesMenu}>
          Services
          {showServicesMenu && (
            <div className="submenu">
              <NavLink  to="/storage" className="submenu-link">
                Storage
              </NavLink >
              <NavLink  to="/database" className="submenu-link">
                Database
              </NavLink >
              {/* Add other service links */}
            </div>
          )}
        </span>
        <NavLink  to="/storage" className="menu-link">
          About us
        </NavLink >
      </div>

      {isAuth ?
      (<div>
        <span onClick={()=>handleLogout()}>Logout</span>
      </div> ):
      (<div>
        <span onClick={toggleLoginForm}>Login</span>
        {showLoginForm && <LoginForm toggleLoginForm={toggleLoginForm} />}
      </div>)}
    </nav>
  );
};

export default Menu;

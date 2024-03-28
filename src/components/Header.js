import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { DataContext } from "./auth/ContextProvider";
import logo from '../images/logo.png'
import { toast } from "react-toastify";

const Header = () => {
  const { userData, handleLogout } = useContext(DataContext);
  const navigate = useNavigate();
  
  const isLoggedIn = userData && Object.keys(userData).length > 0;

  const handleLogoutClick = () => {
    handleLogout();
    toast.success("Logged out successfully!");
    navigate("/login"); // Redirect to login page after logout
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Easy Shop Logo" className="logo" />
        </Link>
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link">Cart</Link>
                </li>
                <li className="nav-item">
                  <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

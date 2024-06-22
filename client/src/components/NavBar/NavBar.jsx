import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = ({ currentPage }) => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="current-page">
          {currentPage}
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="auth-buttons">
          <Link to="/signin" className="auth-button">Sign In</Link>
          <Link to="/signup" className="auth-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

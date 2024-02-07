// Em Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaEnvelope, FaUser } from 'react-icons/fa';
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className={`header-container ${isMenuOpen ? 'menu-open' : ''}`}>
        <div className="left-section">
          <button className="menu-button" onClick={handleMenuToggle}>
            <FaBars />
          </button>
          <h1>AstroBooks</h1>
        </div>
        <div className="right-section">
          <SearchBar />
          <nav className="nav-menu">
            <Link to="/messages">
              <FaEnvelope />
            </Link>
          </nav>
          <button className="login-button">
            <Link to="/profile">
              <FaUser />
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
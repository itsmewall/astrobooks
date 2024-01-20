// Em Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaEnvelope, FaUser } from 'react-icons/fa'; // Importa o ícone de usuário
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="header-container">
        <div className="left-section">
          <button className="menu-button" onClick={handleMenuToggle}>
            <FaBars />
          </button>
          <h1>AstroBooks</h1>
        </div>
        <div className="right-section">
          <SearchBar />
          <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <Link to="/messages">
              <FaEnvelope />
            </Link>
          </nav>
          <button className="login-button">
            <FaUser /> {/* Adiciona o ícone de usuário */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

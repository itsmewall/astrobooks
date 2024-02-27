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
      <div className="header-container">
        <div className="left-section">
          <button className="menu-button" onClick={handleMenuToggle} aria-expanded={isMenuOpen}>
            <FaBars />
          </button>
          <h1>AstroBooks</h1>
        </div>
        <div className={`right-section ${isMenuOpen ? 'show' : ''}`}>
          <SearchBar />
          <nav className="nav-menu" aria-label="Menu principal">
            <Link to="/messages">
              <FaEnvelope title="Mensagens" />
            </Link>
            <Link to="/profile">
              <FaUser title="Perfil" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

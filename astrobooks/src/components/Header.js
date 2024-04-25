import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaEnvelope, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { logoutUser } from './Auth'; 
import SearchBar from './SearchBar';
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("Logout realizado com sucesso.");
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
    }
  };

  return (
    <header>
      <div className={`header-container ${isMenuOpen ? 'menu-open' : ''}`}>
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
            <button onClick={handleLogout} className="logout-button" title="Logout">
              <FaSignOutAlt />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
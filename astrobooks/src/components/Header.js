// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      <h1>AstroBooks</h1>
      <Link to="/messages">Ir para Mensagens</Link>
    </header>
  );
};

export default Header;

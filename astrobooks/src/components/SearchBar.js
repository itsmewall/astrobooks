// Em SearchBar.js
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Pesquisar..." />

    </div>
  );
};

export default SearchBar;

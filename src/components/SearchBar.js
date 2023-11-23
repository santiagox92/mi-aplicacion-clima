// src/components/SearchBar.js

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Icono de lupa
import './SearchBar.css';
import logo from './logo weatherapp.png';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <img src={logo} alt="Logo" className="logo" />
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Buscar ciudad..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
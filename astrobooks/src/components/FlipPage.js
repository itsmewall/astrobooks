import React, { useState } from 'react';
import classNames from 'classnames';
import '../styles/FlipPage.css'; // Make sure to adjust the path as needed

const FlipPage = ({ chapters, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [darkMode, setDarkMode] = useState(false);

  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, chapters.length - 1));

  const contentStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    color: darkMode ? '#FFFFFF' : '#000000',
    backgroundColor: darkMode ? '#333333' : '#FFFFFF',
    transition: 'font-size 0.3s ease-in-out',
  };

  return (
    <div className="flipbook-overlay">
      <div className="settings-panel">
        <button onClick={onClose} className="close-button">
          X
        </button>
        <h4>Configurações</h4>
        <div className="font-size-controls">
          <button onClick={() => setFontSize((prevSize) => prevSize - 1)}>-</button>
          <span>{fontSize}px</span>
          <button onClick={() => setFontSize((prevSize) => prevSize + 1)}>+</button>
        </div>
        <div className="font-family-selection">
          {['Arial', 'Georgia', 'Times New Roman'].map((font) => (
            <button
              key={font}
              className={classNames({ 'font-active': fontFamily === font })}
              onClick={() => setFontFamily(font)}
            >
              {font}
            </button>
          ))}
        </div>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <div className="flipbook-content" style={contentStyle}>
        <div className="flipbook-page">
          <h3>{chapters[currentPage].titulo}</h3>
          <p>{chapters[currentPage].conteudo}</p>
        </div>
        <div className="navigation-buttons">
          <button onClick={handlePrevPage} disabled={currentPage === 0}>
            Anterior
          </button>
          <button onClick={handleNextPage} disabled={currentPage === chapters.length - 1}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipPage;

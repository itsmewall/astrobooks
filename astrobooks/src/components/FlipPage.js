import React, { useState } from 'react';
import '../styles/FlipPage.css'; // Assegure-se de que o caminho está correto

const FlipPage = ({ chapters, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [darkMode, setDarkMode] = useState(false);

  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, chapters.length - 1));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const contentStyle = {
    fontSize: `${fontSize}px`,
    fontFamily: fontFamily,
    color: darkMode ? '#FFFFFF' : '#000000', // Cor do texto baseada no modo escuro
    backgroundColor: darkMode ? '#333333' : '#FFFFFF', // Cor de fundo baseada no modo escuro
  };

  return (
    <div className={`flipbook-overlay ${darkMode ? 'dark-mode' : ''}`}>
      <div className="settings-panel">
        <button onClick={onClose} className="close-button">Fechar</button>
        <div className="settings-card">
          <h4>Tamanho da Fonte</h4>
          <div className="settings-control">
            <button onClick={() => setFontSize(fontSize + 1)}>+</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(Math.max(fontSize - 1, 12))}>-</button>
          </div>
        </div>
        <div className="settings-card">
          <h4>Tipo de Fonte</h4>
          <div className="settings-control font-family">
            {['Arial', 'Georgia', 'Times New Roman'].map((font) => (
              <button
                key={font}
                className={`font-button ${fontFamily === font ? 'active' : ''}`}
                onClick={() => setFontFamily(font)}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
        <div className="settings-card">
          <h4>Modo Escuro</h4>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
      <div className="flipbook-content" style={{ fontSize: `${fontSize}px`, fontFamily }}>
        {chapters.length > 0 && (
          <div className="page-content">
            <h3>{chapters[currentPage].titulo}</h3>
            <p>{chapters[currentPage].conteudo}</p>
          </div>
        )}
        <div className="navigation-buttons">
          <button onClick={handlePrevPage} disabled={currentPage === 0}>Anterior</button>
          <button onClick={handleNextPage} disabled={currentPage === chapters.length - 1}>Próximo</button>
        </div>
      </div>
    </div>
  );
};

export default FlipPage;
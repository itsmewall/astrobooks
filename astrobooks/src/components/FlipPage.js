import React, { useState } from 'react';
import '../styles/FlipPage.css'; 

const FlipPage = ({ chapters, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [fontFamily, setFontFamily] = useState('Arial');
  const [darkMode, setDarkMode] = useState(false);

  const handlePrevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  const handleNextPage = () => setCurrentPage((prevPage) => Math.min(prevPage + 1, chapters.length - 1));
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flipbook-overlay ${darkMode ? 'dark-mode' : ''}`}>
      <div className="settings-panel">
        <h1>Configurações</h1>
        <button onClick={onClose} className="close-button">&times;</button>
        <div className="settings-card">
          <h4>Tamanho da Fonte</h4>
          <div className="settings-control">
            <button onClick={() => setFontSize(Math.max(fontSize - 1, 12))}>-</button>
            <span>{fontSize}px</span>
            <button onClick={() => setFontSize(fontSize + 1)}>+</button>
          </div>
        </div>
        <div className="settings-card">
          <h4>Tipo de Fonte</h4>
          <div className="font-family">
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
            {darkMode ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
          </button>
        </div>
      </div>
      <div className="flipbook-content" style={{ fontSize: `${fontSize}px`, fontFamily }}>
        {chapters.length > 0 ? (
          <article>
            <h3>{chapters[currentPage].titulo}</h3>
            <p>{chapters[currentPage].conteudo}</p>
          </article>
        ) : (
          <p>Nenhum conteúdo disponível.</p>
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

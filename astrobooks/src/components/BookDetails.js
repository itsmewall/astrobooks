// BookDetails.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookDetails.css';
import Header from './Header';

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showSummary, setShowSummary] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/livros/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao obter dados: ${response.statusText}`);
        }

        const livroData = await response.json();
        setBookDetails(livroData);
      } catch (error) {
        console.error(error.message);
        setError('Erro ao obter os detalhes do livro. Tente novamente mais tarde.');
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleChapterClick = (chapter) => {
    setSelectedChapter(chapter);
    setShowSummary(true);
  };

  const showSummaryForChapter = (chapter) => {
    return !selectedChapter || selectedChapter.id !== chapter.id;
  };

  const handleMarkAsCompleted = () => {
    // Lógica para marcar o capítulo como concluído
    // Você pode adicionar sua própria lógica aqui
  };

  const handleAddToFavorites = () => {
    // Lógica para adicionar o capítulo aos favoritos
    // Você pode adicionar sua própria lógica aqui
  };

  const handleReportError = () => {
    // Lógica para reportar um erro no capítulo
    // Você pode adicionar sua própria lógica aqui
  };

  return (
    <div>
      <Header />
      <div className="container split-layout">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="book-info">
              <h2 className="book-title">{bookDetails.titulo}</h2>
              <img
                className="book-cover"
                src={`${process.env.PUBLIC_URL}/capas/1.jpg`}
                alt={`Capa de ${bookDetails.titulo}`}
              />
              <p>Autor: {bookDetails.autor}</p>
              <p>Editora: {bookDetails.editora}</p>
              <p>Edição: {bookDetails.edicao}</p>
              <p>Ano: {bookDetails.ano}</p>
              <p>Gênero: {bookDetails.genero}</p>
              <p>Idioma: {bookDetails.idioma}</p>
              {showSummary && <p>Resenha: {bookDetails.resenha}</p>}
            </div>
            <ul className="chapter-list">
              {bookDetails.capitulos &&
                bookDetails.capitulos.map((capitulo) => (
                  <li key={capitulo.id}>
                    <div className="chapter-card" onClick={() => handleChapterClick(capitulo)}>
                      <h3 className="chapter-title">{capitulo.titulo}</h3>
                      {showSummaryForChapter(capitulo) && (
                        <p className="chapter-summary">Resumo: {capitulo.resumo}</p>
                      )}
                      <div className={`chapter-content ${selectedChapter === capitulo ? 'active' : ''}`}>
                        <p>Conteúdo: {capitulo.conteudo}</p>
                      </div>
                      <div className="action-buttons">
                        <button onClick={handleMarkAsCompleted}>Parte Concluída</button>
                        <button onClick={handleAddToFavorites}>Adicionar aos Favoritos</button>
                        <button onClick={handleReportError}>Reportar Erro</button>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
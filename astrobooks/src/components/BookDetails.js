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
  const [readingProgress, setReadingProgress] = useState(0);

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
    // Simulação de lógica para marcar o capítulo como concluído
    // Atualiza o progresso de leitura
    setReadingProgress((prevProgress) => prevProgress + 10);
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
            <div className="reading-section">
              <div className="flipbook">
                {/* Flipbook aqui */}
              </div>
              <div className="chapter-list">
                {bookDetails.capitulos &&
                  bookDetails.capitulos.map((capitulo) => (
                    <li key={capitulo.id}>
                      <div className="chapter-card" onClick={() => handleChapterClick(capitulo)}>
                        <h3 className="chapter-title">{capitulo.titulo}</h3>
                        {showSummaryForChapter(capitulo) && (
                          <p className="chapter-summary">Resumo: {capitulo.resumo}</p>
                        )}
                        <div className={`chapter-content ${selectedChapter === capitulo ? 'active' : ''}`}>
                          <p>{capitulo.conteudo}</p>
                        </div>
                        <div className="action-buttons">
                          <button onClick={handleMarkAsCompleted}>Parte Concluída</button>
                          <button onClick={handleAddToFavorites}>Adicionar aos Favoritos</button>
                          <button onClick={handleReportError}>Reportar Erro</button>
                        </div>
                      </div>
                    </li>
                  ))}
              </div>
            </div>
            <div className="reading-progress">
              <p>Progresso de Leitura: {readingProgress}%</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${readingProgress}%` }}></div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

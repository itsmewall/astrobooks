import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/BookDetails.css';
import Header from './Header'

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);

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
  };

  return (
    <div>
      <Header />
      <div className="container">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="book-details">
            <h2 className="book-title">{bookDetails.titulo}</h2>
            <ul className="chapter-list">
              {bookDetails.capitulos &&
                bookDetails.capitulos.map((capitulo) => (
                  <li key={capitulo.id}>
                    <div
                      className="chapter-card"
                      onClick={() => handleChapterClick(capitulo)}
                    >
                      <h3 className="chapter-title">{capitulo.titulo}</h3>
                      <p className="chapter-summary">Resumo: {capitulo.resumo}</p>
                      <div
                        className={`chapter-content ${
                          selectedChapter === capitulo ? 'active' : ''
                        }`}
                      >
                        <p>Conteúdo: {capitulo.conteudo}</p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
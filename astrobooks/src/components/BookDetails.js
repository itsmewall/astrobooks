import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import FlipPage from './FlipPage';
import '../styles/BookDetails.css';
import Header from './Header'; 

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://192.168.53.68:5000/livros/${id}`);
        setBookDetails(response.data);
      } catch (error) {
        console.error('Erro ao obter dados:', error.message);
        setError('Erro ao obter os detalhes do livro. Tente novamente mais tarde.');
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="container split-layout">
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            <div className="book-details-card">
              <h1>{bookDetails.nome}</h1>
              <img src={bookDetails.coverImage} alt="Capa do livro" className="book-cover" />
              <p>Autor: {bookDetails.autor}</p>
              <p>Editora: {bookDetails.editora}, Edição: {bookDetails.edicao}</p>
              <p>Ano: {bookDetails.ano}</p>
              <p>Gênero: {bookDetails.genero}</p>
              <p>Idioma: {bookDetails.idioma}</p>
              <div className="book-description">
                <p>{bookDetails.resenha}</p>
              </div>
              <button onClick={() => setIsFlipbookOpen(true)}>Ler Livro</button>
            </div>
            <div className="chapter-list-card">
              {bookDetails.capitulos &&
                bookDetails.capitulos.map((capitulo, index) => (
                  <div key={index} className="chapter-card">
                    <h3 className="chapter-title">{capitulo.titulo}</h3>
                    <p className="chapter-summary">{capitulo.resumo || "Sem resumo disponível."}</p>
                  </div>
                ))}
            </div>
            {isFlipbookOpen && bookDetails.capitulos && (
              <FlipPage chapters={bookDetails.capitulos} onClose={() => setIsFlipbookOpen(false)} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
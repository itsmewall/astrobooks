// BookDetails.js
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
        const response = await axios.get(`http://localhost:5000/livros/${id}`);
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
            <div className="book-info">
              {/* Informações do livro */}
              <button onClick={() => setIsFlipbookOpen(true)}>Ler Livro</button>
            </div>
            {isFlipbookOpen && bookDetails.capitulos && (
              <FlipPage
                chapters={bookDetails.capitulos}
                onClose={() => setIsFlipbookOpen(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetails;

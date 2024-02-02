// Em BookCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/livros/${book.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      {book.coverImage ? (
      <img src={book.coverImage} alt={book.nome} />
      ) : (
        <div className="placeholder-image">Imagem não disponível</div>
      )}
      <div className="card-content">
        <h1>{book.nome}</h1>
        {book.autor && <h2>{book.autor}</h2>}
      </div>
    </div>
  );
};

export default BookCard;

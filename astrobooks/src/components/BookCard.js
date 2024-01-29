// BookCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/bookdata/${book.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <h3>{book.title}</h3>
      {book.coverImage ? (
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.title} />
      ) : (
        <p>Imagem não disponível</p>
      )}
      {book.author && <p>Autor: {book.author}</p>}
    </div>
  );
};

export default BookCard;

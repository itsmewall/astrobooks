import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className="card">
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

// src/components/BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <img src={book.cover} alt={`Capa de ${book.title}`} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default BookCard;

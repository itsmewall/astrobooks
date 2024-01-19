// Em BookCard.js
import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      {book.author && <p>Autor: {book.author}</p>}
    </div>
  );
};

export default BookCard;

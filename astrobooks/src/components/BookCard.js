// Em BookCard.js
import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  return (
      <div className="card">
        <h3>{book.title}</h3>
        {book.author && <p>Autor: {book.author}</p>}
      </div>
  );
};

export default BookCard;

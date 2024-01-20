// Em BookCard.js
import React from 'react';
import '../styles/BookCard.css';

const BookCard = ({ book }) => {
  // Remove o "percent encoding" dos espaços no nome do diretório
  const imagePath = book.images && book.images.length > 0 ? book.images[0].replace(/%20/g, ' ') : '';

  return (
    <div className="card">
      <h3>{book.title}</h3>
      {imagePath ? (
        <img src={`./${imagePath}`} alt={book.title} />
      ) : (
        <p>Imagem não disponível</p>
      )}
      {book.author && <p>Autor: {book.author}</p>}
    </div>
  );
};

export default BookCard;

import React from 'react';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      {/* Verifica se a propriedade 'cover' existe antes de usá-la */}
      {book.cover && <img src={book.cover} alt={`Capa de ${book.title}`} />}
      <h3>{book.title}</h3>
      {/* Verifica se a propriedade 'author' existe antes de usá-la */}
      {book.author && <p>{book.author}</p>}
      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default BookCard;
// BookCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/livros/${book.id}`);
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <h3>{book.titulo}</h3>
      {book.capitulos && book.capitulos.length > 0 ? (
        <p>Capítulos: {book.capitulos.length}</p>
      ) : (
        <p>Sem capítulos disponíveis</p>
      )}
      {book.autor && <p>Autor: {book.autor}</p>}
      {book.coverImage ? (
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.titulo} />
      ) : (
        <p>Imagem não disponível</p>
      )}
    </div>
  );
};

export default BookCard;
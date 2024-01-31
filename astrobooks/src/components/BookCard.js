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
      <h1>{book.titulo}</h1>
      {book.autor && <h2>{book.autor}</h2>}
      <p>{book.Editora}</p>
      <p>{book.ano}</p>
      {book.capitulos && book.capitulos.length > 0 ? (
        <p>Partes: {book.capitulos.length}</p>
      ) : (
        <p>Sem partes disponíveis</p>
      )}
      {book.coverImage ? (
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.titulo} />
      ) : (
        <p>Imagem não disponível</p>
      )}
    </div>
  );
};

export default BookCard;
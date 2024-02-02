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
        <img src={`http://localhost:5000${book.coverImage}`} alt={book.titulo} />
      ) : (
        <div className="placeholder-image">Imagem não disponível</div>
      )}
      <h1>{book.titulo}</h1>
      {book.autor && <h2>{book.autor}</h2>}
      <p>Editora: {book.Editora}</p>
      <p>Ano: {book.ano}</p>
      {book.capitulos && book.capitulos.length > 0 ? (
        <p>Partes: {book.capitulos.length}</p>
      ) : (
        <p>Sem partes disponíveis</p>
      )}
    </div>
  );
};

export default BookCard;
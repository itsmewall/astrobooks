// src/components/BookViewer.js
import React, { useState, useEffect } from 'react';

const BookViewer = ({ book }) => {
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <img src={book.cover} alt={`${book.title} Cover`} />
      {/* Adicione a renderização do conteúdo HTML aqui */}
    </div>
  );
};

export default BookViewer;

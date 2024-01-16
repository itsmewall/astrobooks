// src/components/BookList.js
import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map((book, index) => (
        <li key={index}>
          <img src={book.cover} alt={`${book.title} - ${book.author}`} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookList;

// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import BookViewer from './BookViewer';

const BookList = ({ books }) => {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  useEffect(() => {
    if (selectedBookId !== null) {
      // Aqui você pode fazer algo com o bookId selecionado, como exibir detalhes ou abrir um modal
      console.log('Selected Book ID:', selectedBookId);
    }
  }, [selectedBookId]);

  return (
    <div>
      <ul>
        {books.map((book, index) => (
          <li key={index} onClick={() => handleBookClick(book.id)}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
      {selectedBookId && <BookViewer bookId={selectedBookId} />}
    </div>
  );
};

export default BookList;

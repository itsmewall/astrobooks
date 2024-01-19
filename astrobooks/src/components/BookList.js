// Em BookList.js
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookdata');
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="book-list">
      {/* Renderize o componente BookCard para cada livro */}
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;

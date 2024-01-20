// Em BookList.js
import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';
import '../styles/BookList.css';

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
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;

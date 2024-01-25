import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={`/book/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
          <BookCard book={book} />
        </Link>
      ))}
    </div>
  );
};

export default BookList;

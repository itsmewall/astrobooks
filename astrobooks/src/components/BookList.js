import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/livros/');
        if (!response.ok) {
          throw new Error(`Erro ao obter dados: ${response.statusText}`);
        }
        
        const booksData = await response.json();
        setBooks(booksData);
      } catch (error) {
        console.error(error.message);
        setError('Erro ao obter os livros. Tente novamente mais tarde.');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="book-list">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        books.map((book) => (
          <Link to={`/livros/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
            <BookCard book={book} />
          </Link>
        ))
      )}
    </div>
  );
};

export default BookList;

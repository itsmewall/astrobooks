import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import '../styles/BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.53.68:5000/livros/');
        setBooks(response.data);
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

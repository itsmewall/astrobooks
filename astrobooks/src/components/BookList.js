import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import BookCard from './BookCard';
import '../styles/BookList.css';
import { generosDeLivros } from './constants/generos';

const apiUrl = process.env.REACT_APP_HOST;
const apiPort = process.env.REACT_APP_PORT;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}:${apiPort}/livros/`);
        setBooks(response.data);
        const organizedBooks = organizeBooksByGenre(response.data);
        setFilteredBooks(organizedBooks);
      } catch (error) {
        console.error(error.message);
        setError('Erro ao obter os livros. Tente novamente mais tarde.');
      }
    };

    fetchData();
  }, []);

  const organizeBooksByGenre = (books) => {
    const booksByGenre = {};

    generosDeLivros.forEach((genero) => {
      booksByGenre[genero] = books.filter((book) => {
        return book.genero && book.genero.includes(genero);
      });
    });

    return booksByGenre;
  };

  return (
    <div className="book-list-container">
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="all-books-section">
            <div className="genre-section">
              {books.map((book) => (
                <Link to={`/livros/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
                  <BookCard book={book} />
                </Link>
              ))}
            </div>
          </div>
          {Object.keys(filteredBooks).map((genero) => {
            const booksInGenre = filteredBooks[genero];
            return booksInGenre.length > 0 && (
              <div key={genero} className="genre-specific-section">
                <h2>{genero}</h2>
                <div className="genre-section">
                  {booksInGenre.map((book) => (
                    <Link to={`/livros/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
                      <BookCard book={book} />
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default BookList;

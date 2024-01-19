// src/components/Home.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BookList from './BookList';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await fetch('/api/books/all');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching all books data: ${JSON.stringify(data)}`);
        }

        setAllBooks(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchAllBooks();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="container">
        <Navbar />
        <div className="content">
          <section className="all-books">
            <h2>Todos os Livros</h2>
            <BookList books={allBooks} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

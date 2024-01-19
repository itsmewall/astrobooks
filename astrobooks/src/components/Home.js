// Em Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import '../styles/Home.css';
import BookList from './BookList';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./allBooks.json');
        const booksData = await response.json();
        setAllBooks(booksData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="container">
        <Navbar />
        <div className="content">
          <section className="all-books">
            <h2>Todos os Livros</h2>
            {/* Passe os dados diretamente para o componente BookList */}
            <BookList books={allBooks} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

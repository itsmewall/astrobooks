// Em Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import '../styles/Home.css';
import BookList from './BookList';  // Importe o componente BookList
import { getAllBooksData } from './allBooks';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksData = getAllBooksData();
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
            {/* Utilize o componente BookList para exibir a lista de livros */}
            <BookList books={allBooks} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

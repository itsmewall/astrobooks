// src/components/Home.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BookList from './BookList';
import '../styles/Home.css';

const Home = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/booksinfo/allBooks');
        const data = await response.json();

        // Adicione este log para verificar a resposta
        console.log('Response from API:', data);

        if (!response.ok) {
          throw new Error(`Error fetching all books data: ${JSON.stringify(data)}`);
        }

        setAllBooks(data);
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
            <BookList books={allBooks} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

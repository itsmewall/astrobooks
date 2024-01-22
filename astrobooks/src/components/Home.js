// Em Home.js
import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import '../styles/Home.css';
import BookList from './BookList';

const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="container">
        <Navbar />
        <div className="content">
          <section className="all-books">
            <h2>Todos os Livros</h2>
            <BookList />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
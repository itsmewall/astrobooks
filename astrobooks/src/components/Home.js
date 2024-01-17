// src/components/Home.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BookList from './BookList';

const Home = () => {
  const [highlightedBooks, setHighlightedBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [editorChoices, setEditorChoices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchBooks = async (endpoint) => {
          const response = await fetch(`/api/books/${endpoint}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(`Error fetching ${endpoint} data: ${JSON.stringify(data)}`);
          }

          return data;
        };

        const highlightedData = await fetchBooks('highlighted');
        setHighlightedBooks(highlightedData);

        const favoriteData = await fetchBooks('favorite');
        setFavoriteBooks(favoriteData);

        const editorChoicesData = await fetchBooks('editorChoices');
        setEditorChoices(editorChoicesData);
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
          <section className="highlighted-books">
            <h2>Em Destaque</h2>
            <BookList books={highlightedBooks} />
          </section>
          <section className="favorite-books">
            <h2>Favoritos</h2>
            <BookList books={favoriteBooks} />
          </section>
          <section className="editor-choices">
            <h2>Escolhas do Editor</h2>
            <BookList books={editorChoices} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
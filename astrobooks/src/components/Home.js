// src/components/Home.js
import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import BookList from './BookList';

const Home = () => {
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

// Exemplo de dados (substitua isso pelos seus dados reais)
const highlightedBooks = [
  { title: 'Livro 1', author: 'Autor 1', cover: 'cover1.jpg' },
  { title: 'Livro 2', author: 'Autor 2', cover: 'cover2.jpg' },
  // Adicione mais livros conforme necessário
];

const favoriteBooks = [
  { title: 'Livro A', author: 'Autor A', cover: 'coverA.jpg' },
  { title: 'Livro B', author: 'Autor B', cover: 'coverB.jpg' },
  // Adicione mais livros conforme necessário
];

const editorChoices = [
  { title: 'Escolha 1', author: 'Editor', cover: 'choice1.jpg' },
  { title: 'Escolha 2', author: 'Editor', cover: 'choice2.jpg' },
  // Adicione mais escolhas do editor conforme necessário
];

export default Home;

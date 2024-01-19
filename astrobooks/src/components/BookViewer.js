import React, { useState, useEffect } from 'react';

const BookViewer = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await fetch(`/api/booksinfo/${bookId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(`Error fetching book data: ${JSON.stringify(data)}`);
        }

        setBook(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBookData();
  }, [bookId]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <img src={book.cover} alt={`${book.title} Cover`} />

      {/* Renderize o conteúdo HTML do livro */}
      <div dangerouslySetInnerHTML={{ __html: book.content }} />

      {/* Adicione mais detalhes conforme necessário */}
    </div>
  );
};

export default BookViewer;

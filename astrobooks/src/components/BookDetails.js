import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookdata/${id}`);
        if (!response.ok) {
          console.error(`Failed to fetch book details with ID ${id}`);
          return;
        }
        const bookDetailsData = await response.json();
        setBookDetails(bookDetailsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{bookDetails.title}</h2>
      {bookDetails.coverImage && (
        <img src={`http://localhost:5000${bookDetails.coverImage}`} alt={bookDetails.title} />
      )}
      {bookDetails.author && <p>Autor: {bookDetails.author}</p>}
      {/* Adicione outros detalhes do livro conforme necessário */}
    </div>
  );
};

export default BookDetails;

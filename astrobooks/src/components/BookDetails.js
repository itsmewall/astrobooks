// BookDetails.js
import Header from './Header';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/livros/${id}/capitulos`); // Corrigido para a rota correta
        const contentType = response.headers.get("content-type");
  
        if (contentType && contentType.indexOf("application/json") !== -1) {
          // Se a resposta for JSON, interpretar normalmente
          const data = await response.json();
          setBookDetails(data);
        } else {
          // Se a resposta não for JSON, interpretar como texto
          const data = await response.text();
          // Aqui você pode manipular ou exibir o HTML como necessário
          console.log(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <h2>{bookDetails.title}</h2>
      {bookDetails.images && bookDetails.images.length > 0 && (
        <img src={`http://localhost:5000${bookDetails.images[0]}`} alt={bookDetails.title} />
      )}
      <p>ID: {bookDetails.id}</p>
      <p>Folder: {bookDetails.folder}</p>
    </div>
  );
};

export default BookDetails;

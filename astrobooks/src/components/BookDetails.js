// BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({ resumos: {} });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/livros/${id}/resumos`);
        if (!response.ok) {
          throw new Error(`Erro ao obter dados: ${response.statusText}`);
        }

        const resumosData = await response.json();
        setBookDetails(resumosData);
      } catch (error) {
        console.error(error.message);
        setError('Erro ao obter os detalhes do livro. Tente novamente mais tarde.');
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div>
          <h2>{bookDetails.titulo}</h2>
          <ul>
            {bookDetails.resumos &&
              Object.entries(bookDetails.resumos).map(([titulo, resumo]) => (
                <li key={titulo}>
                  <h3>{titulo}</h3>
                  <p>{resumo.conteudo}</p>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookDetails;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, CircularProgress } from '@mui/material';
import FlipPage from './FlipPage';
import Header from './Header';
import '../styles/BookDetails.css';

// Hook personalizado para buscar os detalhes do livro
const useBookDetails = (bookId) => {
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/livros/${bookId}`);
        setBookDetails(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro ao obter dados:', error.message);
        setError('Erro ao obter os detalhes do livro. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  return { bookDetails, error, isLoading };
};

const BookDetails = () => {
  const { id } = useParams();
  const { bookDetails, error, isLoading } = useBookDetails(id);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);

  if (isLoading) {
    return <CircularProgress style={{ display: 'block', margin: 'auto' }} />;
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card raised>
              <CardMedia
                component="img"
                className="book-cover" 
                image={bookDetails.coverImage}
                alt="Capa do livro"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {bookDetails.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Autor: {bookDetails.autor}<br />
                  Editora: {bookDetails.editora}, Edição: {bookDetails.edicao}<br />
                  Ano: {bookDetails.ano}<br />
                  Gênero: {bookDetails.genero}<br />
                  Idioma: {bookDetails.idioma}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <div className="book-description">
                    {bookDetails.resenha}
                  </div>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => setIsFlipbookOpen(true)}>Ler Livro</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            {bookDetails.capitulos && bookDetails.capitulos.map((capitulo, index) => (
              <Card key={index} raised sx={{ mb: 2 }}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {capitulo.titulo}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {capitulo.resumo || "Sem resumo disponível."}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Container>
      {isFlipbookOpen && bookDetails.capitulos && (
        <FlipPage chapters={bookDetails.capitulos} onClose={() => setIsFlipbookOpen(false)} />
      )}
    </>
  );
};

export default BookDetails;
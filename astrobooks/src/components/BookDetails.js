import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, CardActions, CircularProgress } from '@mui/material';
import FlipPage from './FlipPage';
import Header from './Header';
import '../styles/BookDetails.css';

const BookDetails = () => {
  const { id } = useParams();
  const [bookDetails, setBookDetails] = useState({});
  const [error, setError] = useState(null);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:5000/livros/${id}`)
      .then(response => {
        setBookDetails(response.data);
        setError(null);
      })
      .catch(error => {
        console.error('Erro ao obter dados:', error.message);
        setError('Erro ao obter os detalhes do livro. Tente novamente mais tarde.');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <CircularProgress style={{ display: 'block', margin: '0 auto' }} />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" style={{ marginTop: '2rem' }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={4}>
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
                  Idioma: {bookDetails.idioma}<br />
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
              <Card key={index} elevation={4} style={{ marginBottom: '1rem' }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="h2">
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
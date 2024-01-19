const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

const booksFolderPath = path.join(__dirname, 'booksInfo');
const PORT = 5000;

app.use(cors());

app.use(express.static(booksFolderPath));

app.get('/api/booksinfo/:id', (req, res) => {
  const bookId = req.params.id;
  const bookPath = path.join(booksFolderPath, bookId, 'data.json');

  try {
    const data = require(bookPath);

    // Leia o conteúdo HTML do livro
    const htmlPath = path.join(booksFolderPath, data.content);
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Adicione o conteúdo HTML à resposta
    data.content = htmlContent;

    res.json(data);
  } catch (error) {
    console.error(`Error reading data for book ${bookId}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/booksinfo/allBooks', (req, res) => {
  try {
    const allBooksPath = path.join(booksFolderPath, 'allBooks.json');
    const allBooksData = require(allBooksPath);
    res.json(allBooksData);
  } catch (error) {
    console.error('Error reading all books data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
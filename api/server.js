const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(express.json());

const booksInfoFolderPath = path.join(__dirname, 'booksInfo');
const allBooksFilePath = path.join(booksInfoFolderPath, 'allBooks.json');

// Rota para obter dados de todos os livros
app.get('/api/bookdata', (req, res) => {
  try {
    const fileContent = fs.readFileSync(allBooksFilePath, 'utf-8');
    const allBooksData = JSON.parse(fileContent);
    res.json(allBooksData);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Middleware para lidar com rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', details: 'Endpoint not found' });
});

// Middleware para lidar com erros (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

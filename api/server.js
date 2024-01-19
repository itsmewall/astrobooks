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
    console.log('File Content:', fileContent);
    const allBooksData = JSON.parse(fileContent);
    res.json(allBooksData);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
// api/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const app = express();

const booksFolderPath = path.join(__dirname, 'booksInfo');
const PORT = 5000;

app.use(cors());

app.use(express.static(booksFolderPath));

app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  const bookPath = path.join(booksFolderPath, bookId, 'data.json');

  try {
    const data = require(bookPath);
    res.json(data);
  } catch (error) {
    console.error(`Error reading data for book ${bookId}:`, error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

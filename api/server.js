const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const booksInfoFolderPath = path.join(__dirname, 'booksInfo');
const allBooksFilePath = path.join(booksInfoFolderPath, 'allBooks.json');
const booksUnzipFolderPath = path.join(__dirname, 'LivrosUnzip');

// Servir arquivos estáticos diretamente
app.use('/api/bookdata/images', express.static(booksUnzipFolderPath));

// Rota para obter dados de todos os livros
app.get('/api/bookdata', (req, res) => {
  try {
    const fileContent = fs.readFileSync(allBooksFilePath, 'utf-8');
    const allBooksData = JSON.parse(fileContent);

    // Adicione esta linha para fornecer o caminho correto para as imagens
    allBooksData.forEach((book) => {
      book.coverImage = `/api/bookdata/images/${encodeURIComponent(book.folder)}/${book.images[0]}`;
    });

    res.json(allBooksData);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Configuração do servidor WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado via WebSocket');
  
  // Exemplo: ouvir mensagens do cliente
  socket.on('message', (message) => {
    console.log('Mensagem do cliente via WebSocket:', message);
    // Lógica adicional conforme necessário
  });

  // Exemplo: enviar mensagem para o cliente
  socket.emit('message', 'Bem-vindo ao servidor WebSocket!');
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
server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

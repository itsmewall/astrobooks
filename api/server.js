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

// Middleware para lidar com a rota raiz
app.get('/', (req, res) => {
  console.log('Pelo menos até aqui o server funcionou kkkkkkkkk');
  res.send('Hello, this is the root endpoint!');
});


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

    allBooksData.forEach((book) => {
      // Use the book folder from the JSON to construct the book path
      const bookFolderPath = path.join(booksUnzipFolderPath, book.folder);
      const imagesFolderPath = path.join(bookFolderPath, 'images');
      const bookId = book.id.toString();
      let coverImagePath;
      const filePath = path.join(booksInfoFolderPath, `${bookId}.json`);

      // Verificar se o diretório do livro existe
      if (!fs.existsSync(bookFolderPath)) {
        console.error(`Não achei essa pasta sua não: ${bookFolderPath}`);
        return;
      }

      // Verificar se a pasta "images" existe e contém um arquivo .png
      if (fs.existsSync(imagesFolderPath)) {
        const imageFiles = fs.readdirSync(imagesFolderPath);
        const pngFile = imageFiles.find(file => file.toLowerCase().endsWith('.png'));

        if (pngFile) {
          coverImagePath = `/api/bookdata/images/${encodeURIComponent(book.folder)}/images/${encodeURIComponent(pngFile)}`;
        }
      }

      // Se não encontrou na pasta "images", buscar diretamente na pasta do livro
      if (!coverImagePath) {
        const allBookFiles = fs.readdirSync(bookFolderPath);
        const imageFile = allBookFiles.find(file => file.toLowerCase().endsWith('.png') || file.toLowerCase().endsWith('.jpg'));

        if (imageFile) {
          coverImagePath = `/api/bookdata/images/${encodeURIComponent(book.folder)}/${encodeURIComponent(imageFile)}`;
        }
      }

      book.coverImage = coverImagePath || '/api/bookdata/images/default-placeholder.png';
    });

    res.json(allBooksData);
  } catch (error) {
    console.error('Deu erro ao ler seu arquivo JSON :( .......:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;

  try {
    const fileContent = fs.readFileSync(allBooksFilePath, 'utf-8');
    const allBooksData = JSON.parse(fileContent);

    const book = allBooksData.find((b) => b.id.toString() === id);

    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    res.json(book);
  } catch (error) {
    console.error('Deu erro ao ler seu arquivo JSON :( .......:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Configuração do servidor WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado via WebSocket');
  console.log('WebSocket ta Sockando com sucesso!')

  // Exemplo: ouvir mensagens do cliente
  socket.on('message', (message) => {
    console.log('Mensagem do cliente via WebSocket:', message);
    // Lógica adicional conforme necessário
  });

  // Exemplo: enviar mensagem para o cliente
  socket.emit('message', 'Deu bom o WebSocket!');
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

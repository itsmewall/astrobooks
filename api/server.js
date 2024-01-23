const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs').promises;
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
const livrosUnzipFolderPath = path.join(__dirname, 'LivrosUnzip');

// Rota para obter dados de todos os livros com informações de imagem da capa e conteúdo HTML
app.get('/api/bookdata', async (req, res) => {
  try {
    const fileContent = await fs.readFile(allBooksFilePath, 'utf-8');
    const allBooksData = JSON.parse(fileContent);

    // Adiciona informações de imagem da capa para cada livro
    const booksWithImages = await Promise.all(allBooksData.map(async book => {
      const bookFolderPath = path.join(livrosUnzipFolderPath, book.folder);

      try {
        // Encontra um arquivo HTML no diretório do livro
        const htmlFiles = (await fs.readdir(bookFolderPath)).filter(file => /\.html$/i.test(file));
        const htmlFilePath = htmlFiles.length > 0 ? path.join(bookFolderPath, htmlFiles[0]) : null;

        // Lê o conteúdo do arquivo HTML
        const htmlContent = htmlFilePath ? await fs.readFile(htmlFilePath, 'utf-8') : null;

        // Identifica a capa dentro do conteúdo HTML (isso é um exemplo básico, você pode precisar de uma lógica mais avançada)
        const match = /<img.*?src=['"](.*?)['"].*?>/i.exec(htmlContent);
        const coverImage = match ? match[1] : null;
        
        return {
          ...book,
          coverImage: coverImage ? path.join('LivrosUnzip', book.folder, coverImage.replace(/\\/g, '/')) : null,
          htmlContent: htmlContent,
        };
      } catch (error) {
        console.error('Error reading or parsing HTML file:', error);
        return null; // Trata o erro e continua com os próximos livros
      }
    }));

    res.json(booksWithImages.filter(book => book !== null));
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

const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 5000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
    // Lógica para obter os dados do livro do JSON
    const caminhoDoArquivo = path.join(__dirname, 'booksInfo', 'livro.json');
  
    try {
      const livros = JSON.parse(fs.readFileSync(caminhoDoArquivo, 'utf-8'));
      res.json(livros.livro);
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
      res.status(500).json({ error: 'Erro ao ler o arquivo' });
    }
  });
// Rota para obter um livro específico pelo ID
app.get('/livros/:id', (req, res) => {
  const livroId = parseInt(req.params.id);
  const livro = livros.livro.find((livro) => livro.id === livroId);

  if (livro) {
    res.json(livro);
  } else {
    res.status(404).json({ message: 'Livro não encontrado' });
  }
});

// Rota para obter os resumos dos capítulos de um livro específico pelo ID
app.get('/livros/:id/resumos', (req, res) => {
  const livroId = parseInt(req.params.id);
  const livro = livros.livro.find((livro) => livro.id === livroId);

  if (livro && livro.capitulos) {
    const resumos = {};
    livro.capitulos.forEach((capitulo) => {
      resumos[capitulo.titulo] = {
        conteudo: capitulo.conteudo,
        livro_id: capitulo.livro_id,
      };
    });

    res.json({ resumos });
  } else {
    res.status(404).json({ message: 'Livro ou capítulos não encontrados' });
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
  socket.emit('message', 'Deu bom o WebSocket!');
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});
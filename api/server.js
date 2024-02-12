const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: [
    'http://localhost:3000', 
    'http://192.168.53.68:3000', 
    'http://192.168.1.9:3000',
    'https://astrobooks.vercel.app/'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/capas', express.static(path.join(__dirname, 'public', 'capas')))
const caminhoDoArquivoLivros = path.join(__dirname, 'booksInfo', 'livro.json');
let livros;

try {
  livros = JSON.parse(fs.readFileSync(caminhoDoArquivoLivros, 'utf-8'));
} catch (error) {
  console.error('Erro ao ler o arquivo de livros:', error);
  process.exit(1);
}

app.get('/livros', (req, res) => {
  try {
    res.json(livros.livro);
  } catch (error) {
    console.error('Erro ao obter livros:', error);
    res.status(500).json({ error: 'Erro ao obter livros' });
  }
});

app.get('/livros/:id', (req, res) => {
  const livroId = parseInt(req.params.id);
  try {
    const livro = livros.livro.find((livro) => livro.id === livroId);
    if (livro) {
      res.json(livro);
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao obter livro:', error);
    res.status(500).json({ error: 'Erro ao obter livro' });
  }
});

app.get('/livros/:id/resumos', (req, res) => {
  const livroId = parseInt(req.params.id);
  try {
    const resumosDoLivro = livros.livro.find((livro) => livro.id === livroId)?.capitulos;
    if (resumosDoLivro) {
      const resumosComIDs = {};
      resumosDoLivro.forEach((capitulo) => {
        resumosComIDs[capitulo.titulo] = {
          conteudo: capitulo.resumo,
          livro_id: livroId,
          capitulo_id: capitulo.id,
        };
      });
      res.json({ resumos: resumosComIDs });
    } else {
      res.status(404).json({ message: 'Resumos do livro não encontrados' });
    }
  } catch (error) {
    console.error('Erro ao obter resumos:', error);
    res.status(500).json({ error: 'Erro ao obter resumos' });
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado via WebSocket');
  socket.on('message', (message) => {
    console.log('Mensagem do cliente via WebSocket:', message);
  });
  socket.emit('message', 'Deu bom o WebSocket!');
});

server.listen(() => {
  //console.log(`Servidor rodando na porta ${host}:${port}`);
});
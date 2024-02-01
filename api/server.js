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


const corsOptions = {
  origin: ['http://localhost:3000', 'http://192.168.53.68:3000'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

const caminhoDoArquivoLivros = path.join(__dirname, 'booksInfo', 'livro.json');

// Carregar livros do arquivo
let livros;

try {
  livros = JSON.parse(fs.readFileSync(caminhoDoArquivoLivros, 'utf-8'));
} catch (error) {
  console.error('Erro ao ler o arquivo de livros:', error);
  process.exit(1); // Encerrar o processo em caso de erro
}

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
  try {
    res.json(livros.livro);
  } catch (error) {
    console.error('Erro ao obter livros:', error);
    res.status(500).json({ error: 'Erro ao obter livros' });
  }
});

// Rota para obter um livro específico pelo ID
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

// Rota para obter resumos de um livro específico pelo ID
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

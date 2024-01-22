const express = require('express');
const cors = require('cors'); // Importe o módulo CORS
const { exec } = require('child_process');

const app = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));

// Iniciar o ambiente de desenvolvimento do React
exec('npm start', (error, stdout, stderr) => {
  if (error) {
    console.error(`Erro ao iniciar o ambiente de desenvolvimento do React: ${error}`);
    return;
  }
  console.log(`Ambiente de desenvolvimento do React iniciado: ${stdout}`);
});

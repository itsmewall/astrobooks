const { Client } = require('pg');

const client = new Client({
  user: 'wallace',
  host: '192.168.53.68',
  database: 'pwd',
  password: 'astrobyte',
  port: 5432,
});

client.connect()

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    name VARCHAR(30) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    calledname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    bio VARCHAR(255) NOT NULL
  );
`;

client.query(createUserTableQuery)
  .then(result => console.log('Tabela de usuários criada com sucesso.'))
  .catch(error => console.error('Erro ao criar tabela de usuários:', error));

  const insertUserQuery = `
  INSERT INTO users (username, name, lastname, calledname, email, password, gender, birth_date, created_at, bio)
  VALUES ('wallace', 'Wallace', 'Ferreira', 'Wallace', 'wallacedeoliveira10@hotmail.com', 'alobb', 'Masculino','2002-10-01', NOW(), 'Estudante de programação, CTO da AstroByte e Amante da Vida! La Vie est Belle'
)`;

client.query(insertUserQuery)
  .then(result => console.log('Usuário adicionado com sucesso.'))
  .catch(error => console.error('Erro ao adicionar usuário:', error))
  .finally(() => client.end());


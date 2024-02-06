import React, { useState } from 'react';
import { registerUser } from './Auth'; // Ajuste o caminho conforme necessário

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      console.log('Usuário registrado com sucesso!');
      // Redirecione o usuário ou mostre uma mensagem de sucesso
    } catch (error) {
      console.error("Falha no registro:", error.message);
    }
  };

  return (
    <div>
      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
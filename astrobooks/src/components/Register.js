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
    } catch (error) {
      console.error("Falha no registro:", error.message);
    }
  };

  return (
    <div className="auth-container"> 
      <h2>Registrar</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Sobrenome" />
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
        <p>
          Já tem uma conta? <a href="/login">Login</a> 
        </p>
      </form>
    </div>
  );
}

export default Register;
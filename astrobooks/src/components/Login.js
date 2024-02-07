import React, { useState } from 'react';
import { loginUser, loginWithGoogle } from './Auth'; 
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import '../styles/AuthStyles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log('Login realizado com sucesso!');
      navigate('/'); // Redireciona para a tela principal
    } catch (error) {
      console.error("Falha no login:", error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log('Login com Google realizado com sucesso!');
      navigate('/'); // Redireciona para a tela principal
    } catch (error) {
      console.error("Falha no login com Google:", error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login com Google</button>
    </div>
  );
}

export default Login;
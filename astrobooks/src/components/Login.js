import React, { useState } from 'react';
import { loginUser, loginWithGoogle } from './Auth'; 
import { useNavigate, Link } from 'react-router-dom'; // Importe Link do 'react-router-dom'
import '../styles/AuthStyles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      console.log('Login realizado com sucesso!');
      navigate('/'); 
    } catch (error) {
      console.error("Falha no login:", error.message);
      setError("Falha no login. Verifique seu email e senha e tente novamente.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log('Login com Google realizado com sucesso!');
      navigate('/'); 
    } catch (error) {
      console.error("Falha no login com Google:", error.message);
      setError("Falha no login com Google. Tente novamente mais tarde.");
    }
  };
  

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
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
      <div className="register-link">
        Não tem uma conta? <Link to="/register">Cadastre-se</Link>
      </div>
    </div>
  );
}

export default Login;
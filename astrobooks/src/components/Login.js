/* eslint-disable no-undef */
/* global doc, getDoc, setDoc */

// Login.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { io } from 'socket.io-client';
import Header from './Header';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = getAuth();

    const setupWebSocket = (authUser) => {
      const socket = io('http://localhost:5000', { withCredentials: true });

      socket.on('message', (message) => {
        console.log(`Mensagem recebida do servidor: ${message}`);
      });

      setSocket(socket);

      return () => {
        socket.disconnect();
      };
    };

    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser);

      if (authUser) {
        setupWebSocket(authUser);

        navigate('/profile');
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, [navigate]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Janela pop-up cancelada pelo usuário.');
      } else {
        console.error('Erro durante a autenticação:', error);
      }
    }
  };

  const signInWithEmailAndPasswordHandler = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      // Após o login bem-sucedido, obtenha o usuário autenticado
      const authUser = auth.currentUser;

      // Crie o documento do usuário na coleção "users" se ele não existir
      const userRef = doc(firestore, 'users', authUser.uid);
      const userSnapshot = await getDoc(userRef);

      if (!userSnapshot.exists()) {
        const userData = {
          uid: authUser.uid,
          // Outros campos do perfil do usuário
        };
        await setDoc(userRef, userData);
      }

    } catch (error) {
      console.error('Erro durante a autenticação por e-mail e senha:', error);
    }
  };

  const createUserWithEmailAndPasswordHandler = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Erro durante a criação de usuário por e-mail e senha:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <div className="login-content">
          <h2>Login</h2>
          {user ? (
            <>
              <p>Bem-vindo, {user.displayName}!</p>
              <button onClick={handleSignOut}>Sair</button>
            </>
          ) : (
            <>
              <button className="google-button" onClick={signInWithGoogle}>
                Entrar com o Google
              </button>
              <div className="email-password-fields">
                <div>
                  <label>Email:</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label>Senha:</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <button className="email-password-button" onClick={signInWithEmailAndPasswordHandler}>
                Entrar com e-mail e senha
              </button>
              <button className="create-account-button" onClick={createUserWithEmailAndPasswordHandler}>
                Criar conta
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;

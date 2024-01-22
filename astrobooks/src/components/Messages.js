import React, { useState, useEffect } from 'react';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { io } from 'socket.io-client';

import '../styles/Messages.css';
import firebaseApp from './firebase';
import Header from './Header';

const Messages = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:5000', { withCredentials: true });
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

    // Evento de recebimento de mensagem do WebSocket
    socket.on('message', (message) => {
      console.log(`Mensagem recebida do servidor: ${message}`);
      // Faça algo com a mensagem recebida, por exemplo, atualizar o estado do componente
    });

    const unsubscribeAuth = auth.onAuthStateChanged(authUser => {
      setUser(authUser);

      if (authUser) {
        const usersCollection = collection(firestore, 'users');
        const unsubscribeUsers = onSnapshot(usersCollection, snapshot => {
          const usersData = snapshot.docs
            .filter(doc => doc.id !== authUser.uid)
            .map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
          setUsers(usersData);
        });

        const messagesCollection = collection(firestore, 'messages');
        const unsubscribeMessages = onSnapshot(messagesCollection, snapshot => {
          const messagesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMessages(messagesData);
        });

        return () => {
          unsubscribeUsers();
          unsubscribeMessages();
        };
      }
    });

    return () => {
      unsubscribeAuth();
      socket.disconnect();
    };
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(firebaseApp), provider);
  };

  const handleSignOut = async () => {
    await signOut(getAuth(firebaseApp));
  };

  const sendMessage = async () => {
    if (user && message.trim() !== '' && selectedContact) {
      const firestore = getFirestore(firebaseApp);
      await addDoc(collection(firestore, 'messages'), {
        sender: user.displayName,
        recipient: selectedContact.name,
        text: message,
        timestamp: serverTimestamp(),
      });

      // Envie a mensagem também para o servidor WebSocket
      const socketMessage = {
        sender: user.displayName,
        recipient: selectedContact.name,
        text: message,
      };
      socket.emit('message', socketMessage);
      setMessage('');
    }
  };

  return (
    <div>
      <Header />
      <div className="messages-container">
        <h2>Conversa</h2>
        {user ? (
          <>
            <div className="user-info">
              <p>Logado como: {user.displayName}</p>
            </div>
            <div className="button-container">
              <button onClick={handleSignOut}>Sair</button>
            </div>
            <div>
              <h3>Usuários Disponíveis</h3>
              <ul className="users-list">
                {users.map((user) => (
                  <li key={user.id} className="users-list-item">
                    {user.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label htmlFor="contacts">Escolha um contato:</label>
              <select
                id="contacts"
                value={selectedContact ? selectedContact.id : ''}
                onChange={(e) =>
                  setSelectedContact(
                    users.find((user) => user.id === e.target.value)
                  )
                }
              >
                <option value="">Selecione um contato</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedContact ? (
              <>
                <div className="conversation-container">
                  <h3>Conversa com {selectedContact.name}</h3>
                  <ul className="messages-list">
                    {messages
                      .filter(
                        (msg) =>
                          (msg.sender === user.displayName &&
                            msg.recipient === selectedContact.name) ||
                          (msg.sender === selectedContact.name &&
                            msg.recipient === user.displayName)
                      )
                      .map((message) => (
                        <li key={message.id} className="message-item">
                          <strong>{message.sender}:</strong> {message.text}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="message-input-container">
                  <input
                    type="text"
                    placeholder="Digite sua mensagem"
                    className="message-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="send-button" onClick={sendMessage}>
                    Enviar
                  </button>
                </div>
              </>
            ) : (
              <p>Escolha um contato para começar a conversar.</p>
            )}
          </>
        ) : (
          <button className="google-signin-button" onClick={signIn}>
            Entrar com o Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Messages;
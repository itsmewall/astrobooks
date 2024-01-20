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
import firebaseApp from './firebase';
import '../styles/Messages.css';
import Header from './Header';

const Messages = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const firestore = getFirestore(firebaseApp);

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
      setMessage('');
    }
  };

  return (
    <div>
      <Header />
      <h2>Conversa</h2>
      {user ? (
        <>
          <p>Logado como: {user.displayName}</p>
          <button onClick={handleSignOut}>Sair</button>
          <div>
            <h3>Usuários Disponíveis</h3>
            <ul>
              {users.map(user => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="contacts">Escolha um contato:</label>
            <select
              id="contacts"
              value={selectedContact ? selectedContact.id : ''}
              onChange={e =>
                setSelectedContact(
                  users.find(user => user.id === e.target.value)
                )
              }
            >
              <option value="">Selecione um contato</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {selectedContact ? (
            <>
              <h3>Conversa com {selectedContact.name}</h3>
              <ul>
                {messages
                  .filter(
                    msg =>
                      (msg.sender === user.displayName &&
                        msg.recipient === selectedContact.name) ||
                      (msg.sender === selectedContact.name &&
                        msg.recipient === user.displayName)
                  )
                  .map(message => (
                    <li key={message.id}>
                      <strong>{message.sender}:</strong> {message.text}
                    </li>
                  ))}
              </ul>
              <div>
                <input
                  type="text"
                  placeholder="Digite sua mensagem"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
                <button onClick={sendMessage}>Enviar</button>
              </div>
            </>
          ) : (
            <p>Escolha um contato para começar a conversar.</p>
          )}
        </>
      ) : (
        <button onClick={signIn}>Entrar com o Google</button>
      )}
    </div>
  );
};

export default Messages;

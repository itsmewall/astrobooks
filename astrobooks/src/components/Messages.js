import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';

const Messages = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const app = initializeApp({
    apiKey: "AIzaSyB_ZPnhP8TzOAbHt8Qa2XaGgbtCFuy3uOY",
    authDomain: "astrobooks-aa565.firebaseapp.com",
    projectId: "astrobooks-aa565",
    storageBucket: "astrobooks-aa565.appspot.com",
    messagingSenderId: "42748164126",
    appId: "1:42748164126:web:4bc680ec9bd42ff23bd60f",
    measurementId: "G-4EW3SD16RP"
  });

  useEffect(() => {
    const auth = getAuth(app);
    const firestore = getFirestore(app);

    const unsubscribeAuth = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    const messagesCollection = collection(firestore, 'messages');
    const unsubscribeFirestore = onSnapshot(messagesCollection, snapshot => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeFirestore();
    };
  }, [app]);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(getAuth(app), provider);
  };

  const handleSignOut = async () => {
    await signOut(getAuth(app));
  };

  const sendMessage = async () => {
    if (user && message.trim() !== '') {
      const firestore = getFirestore(app);
      await addDoc(collection(firestore, 'messages'), {
        sender: user.displayName,
        text: message,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Conversa</h2>
      {user ? (
        <>
          <p>Logado como: {user.displayName}</p>
          <button onClick={handleSignOut}>Sair</button>
          <ul>
            {messages && messages.map(message => (
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
        <button onClick={signIn}>Entrar com o Google</button>
      )}
    </div>
  );
};

export default Messages;
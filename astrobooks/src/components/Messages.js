import 
React, { 
  useState, 
  useEffect 
} from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import firebaseConfig from './firebase';

const Messages = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const app = initializeApp(firebaseConfig);

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

    const contactsCollection = collection(firestore, 'contacts');
    const unsubscribeContacts = onSnapshot(contactsCollection, snapshot => {
      const contactsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactsData);
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
      unsubscribeContacts();
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
    if (user && message.trim() !== '' && selectedContact) {
      const firestore = getFirestore(app);
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
      <h2>Conversa</h2>
      {user ? (
        <>
          <p>Logado como: {user.displayName}</p>
          <button onClick={handleSignOut}>Sair</button>
          <div>
            <label htmlFor="contacts">Escolha um contato:</label>
            <select
              id="contacts"
              value={selectedContact ? selectedContact.id : ''}
              onChange={e =>
                setSelectedContact(
                  contacts.find(contact => contact.id === e.target.value)
                )
              }
            >
              <option value="">Selecione um contato</option>
              {contacts.map(contact => (
                <option key={contact.id} value={contact.id}>
                  {contact.name}
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

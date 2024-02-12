import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { firestore } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from './Header';

function Profile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        setLoading(true);
        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name || '');
          setLastName(docSnap.data().lastName || '');
        } else {
          setMessage('Nenhum dado de perfil encontrado.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    const docRef = doc(firestore, "users", currentUser.uid);
    try {
      await updateDoc(docRef, {
        name: name,
        lastName: lastName,
      });
      setMessage('Perfil atualizado com sucesso!');
    } catch (error) {
      setMessage(`Erro ao atualizar perfil: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <>
    <Header />
    <div className="profile-container">
      <h2>Perfil</h2>
      {message && <div>{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Sobrenome:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Atualizando...' : 'Atualizar Perfil'}
        </button>
      </form>
    </div>
    </>
  );
}

export default Profile;

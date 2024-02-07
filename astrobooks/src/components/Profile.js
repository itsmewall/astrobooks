import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Importe o hook de autenticação
import { firestore } from './firebase'; // Ajuste conforme necessário
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/Profile.css';

function Profile() {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchData = async () => {
        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setName(docSnap.data().name || '');
          setLastName(docSnap.data().lastName || '');
        }
      };

      fetchData();
    }
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
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      alert('Erro ao atualizar perfil: ', error.message);
    }
    setLoading(false);
  };

  return (
    <div className="profile-container">
      <h2>Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <button type="submit" disabled={loading}>Atualizar Perfil</button>
      </form>
    </div>
  );
}

export default Profile;
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { firestore } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import '../styles/Profile.css';

function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
    email: '',
    bio: '',
    photoURL: '',
    generosFavoritos: [], // Adiciona um campo para os gêneros favoritos
  });
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
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleGenreChange = (e) => {
    const { value, checked } = e.target;
    setProfile(prevState => ({
      ...prevState,
      generosFavoritos: checked
        ? [...prevState.generosFavoritos, value]
        : prevState.generosFavoritos.filter(genre => genre !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(firestore, "users", currentUser.uid);
    const { email, photoURL, ...updateData } = profile; // Exclui email e photoURL da atualização

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
    <>
    <Header />
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
    </>
  );
}

export default Profile;

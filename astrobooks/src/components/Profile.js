import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { firestore } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from './Header';
import '../styles/Profile.css';

function Profile() {
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState({
    name: '',
    lastName: '',
    email: '',
    bio: '',
    photoURL: '',
  });
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false); // Estado para controlar a exibição vs. edição

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        setLoading(true);
        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({
            ...docSnap.data(),
            email: currentUser.email,
            photoURL: currentUser.photoURL || '/default-profile.png',
          });
        } else {
          console.log("Nenhum dado de perfil encontrado.");
        }
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const docRef = doc(firestore, "users", currentUser.uid);
    const { email, photoURL, ...updateData } = profile;

    try {
      await updateDoc(docRef, updateData);
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setLoading(false);
      setEditing(false); // Retorna para o modo de visualização após salvar
    }
  };

  const renderProfileView = () => (
    <div className="profile-view">
      <img src={profile.photoURL || '/default-profile.png'} alt="Foto do Perfil" className="profile-picture" />
      <p><strong>Nome:</strong> {profile.name}</p>
      <p><strong>Sobrenome:</strong> {profile.lastName}</p>
      <p><strong>E-mail:</strong> {profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <button onClick={() => setEditing(true)}>Editar</button>
    </div>
  );

  const renderProfileEdit = () => (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-field">
        <label>Nome:</label>
        <input type="text" name="name" value={profile.name} onChange={handleInputChange} />
      </div>
      <div className="form-field">
        <label>Sobrenome:</label>
        <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} />
      </div>
      <div className="form-field">
        <label>Bio:</label>
        <textarea name="bio" value={profile.bio} onChange={handleInputChange} />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar Alterações'}
      </button>
      <button type="button" onClick={() => setEditing(false)}>Cancelar</button>
    </form>
  );

  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <h1>Perfil</h1>
        {loading ? <p>Carregando...</p> : editing ? renderProfileEdit() : renderProfileView()}
      </div>
    </div>
  );
}

export default Profile;
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { firestore } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import Header from './Header';
import { generosDeLivros } from './constants/generos'; // Importa a lista de gêneros
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
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser) {
        setLoading(true);
        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          // Garante que generosFavoritos seja um array
          const userData = docSnap.data();
          setProfile({
            ...userData,
            email: currentUser.email, // Mantém o e-mail atualizado
            photoURL: currentUser.photoURL || '/default-profile.png', // Usa a foto do Google, se disponível
            generosFavoritos: userData.generosFavoritos || [], // Garante que seja um array, mesmo que vazio
          });
        } else {
          console.log("Nenhum dado de perfil encontrado.");
          setProfile(prev => ({
            ...prev,
            email: currentUser.email,
            photoURL: currentUser.photoURL,
            generosFavoritos: [],
          }));
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
      await updateDoc(docRef, updateData);
      console.log('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setLoading(false);
      setEditing(false); // Retorna ao modo de visualização
    }
  };

  const renderProfileView = () => (
    <div className="profile-view">
      <img src={profile.photoURL || '/default-profile.png'} alt="Foto do Perfil" className="profile-picture" />
      <p>{`${profile.name} ${profile.lastName}`}</p>
      <p>{profile.email}</p>
      <p><strong>Bio:</strong> {profile.bio}</p>
      <p><strong>Gêneros Favoritos:</strong> {profile.generosFavoritos.join(", ")}</p>
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
      <div className="form-field">
        
        <label>Gêneros Favoritos:</label>
        <div className="genre-selection">
          {generosDeLivros.map(genero => (
            <div key={genero} className="genre-item">
              <input
                type="checkbox"
                id={genero}
                name="generosFavoritos"
                value={genero}
                checked={profile.generosFavoritos.includes(genero)}
                onChange={handleGenreChange}
              />
              <label htmlFor={genero} className="genre-label">{genero}</label>
            </div>
          ))}
        </div>
        
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</button>
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
import React, { useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const authUser = auth.currentUser;
  
    if (authUser) {
      const userDoc = doc(firestore, `users/${authUser.uid}`);
      
      const unsubscribe = onSnapshot(userDoc, (snapshot) => {
        console.log('Snapshot data:', snapshot.data());
        setUserProfile(snapshot.data());
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, []);  

  return (
    <div>
      <h2>Profile</h2>
      {userProfile && (
        <>
          <p>Name: {userProfile.name}</p>
          <p>Email: {userProfile.email}</p>
          {/* Adicione mais informações de perfil conforme necessário */}
        </>
      )}
    </div>
  );
};

export default Profile;

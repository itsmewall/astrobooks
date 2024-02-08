import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext(); // Exporting AuthContext directly

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setCurrentUser(user);
      if (user) {
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);
        setIsSubscribed(docSnap.exists() && docSnap.data().assinaturaAtiva); 
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

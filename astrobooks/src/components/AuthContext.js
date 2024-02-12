import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Estado para rastrear se o usuário tem uma assinatura ativa

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Verifica o status da assinatura no Firestore
        const userRef = doc(firestore, "users", user.uid);
        const docSnap = await getDoc(userRef);
        setIsSubscribed(docSnap.exists() && docSnap.data().assinaturaAtiva);
      } else {
        setIsSubscribed(false); // Resetar o status da assinatura se o usuário fizer logout
      }
    });

    return () => unsubscribe(); // Limpa o observador de estado de autenticação
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};

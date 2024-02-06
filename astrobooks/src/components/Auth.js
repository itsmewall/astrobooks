import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// Cadastro de usuário
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    throw error;
  }
};

// Login de usuário
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

// Logout de usuário
const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
    throw error;
  }
};

// Observador de estado de autenticação
const authStateObserver = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { registerUser, loginUser, logoutUser, authStateObserver };
import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Cadastro de usuário
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário cadastrado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    throw error;
  }
};

// Login de usuário
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login realizado com sucesso:", userCredential.user);
    return userCredential;
  } catch (error) {
    console.error("Erro ao fazer login:", error.message);
    throw error;
  }
};

// Logout de usuário
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Logout realizado com sucesso.");
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw error;
  }
};

// Observador de estado de autenticação
const authStateObserver = (callback) => {
  onAuthStateChanged(auth, callback);
};

// Login/Registro com o Google
const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Login com Google bem-sucedido:", result.user);
    return result.user;
  } catch (error) {
    console.error("Erro no login com Google:", error.message);
    throw error;
  }
};

export { registerUser, loginUser, logoutUser, authStateObserver, loginWithGoogle };

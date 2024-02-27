import { auth, firestore } from './firebase'; // Ajuste o caminho conforme necessário
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Função para registrar usuário e salvar seu perfil no Firestore
const registerUser = async (email, password, name, lastName, bio, favoriteGenres, birthDate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(firestore, "users", user.uid), {
      name,
      lastName,
      email,
      bio,
      favoriteGenres,
      birthDate,
    });
    console.log("Usuário registrado e perfil criado com sucesso.");
  } catch (error) {
    console.error("Erro ao registrar usuário e criar perfil:", error);
    console.error("Erro ao registrar usuário e criar perfil:", error);
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
      return result.user; // Retorna o usuário em caso de sucesso
    } catch (error) {
      console.error("Erro no login com Google:", error.message);
      throw error; // Lança o erro para ser capturado pelo componente
    }
  };
  

export { registerUser, loginUser, logoutUser, authStateObserver, loginWithGoogle };

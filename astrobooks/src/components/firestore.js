import { firestore } from './firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Salvar informações do usuário
const saveUserInfo = async (userId, userInfo) => {
  try {
    await setDoc(doc(firestore, "users", userId), userInfo);
  } catch (error) {
    console.error("Erro ao salvar informações do usuário:", error);
    throw error;
  }
};

// Buscar informações do usuário
const getUserInfo = async (userId) => {
  try {
    const docRef = doc(firestore, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Não há documentos!");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar informações do usuário:", error);
    throw error;
  }
};

export { saveUserInfo, getUserInfo };

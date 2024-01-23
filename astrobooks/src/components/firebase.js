import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Import auth from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'; // Import firestore from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_ZPnhP8TzOAbHt8Qa2XaGgbtCFuy3uOY",
  authDomain: "astrobooks-aa565.firebaseapp.com",
  projectId: "astrobooks-aa565",
  storageBucket: "astrobooks-aa565.appspot.com",
  messagingSenderId: "42748164126",
  appId: "1:42748164126:web:4bc680ec9bd42ff23bd60f",
  measurementId: "G-4EW3SD16RP"
};

// Inicializa o Firebase e exporta as instâncias necessárias
const app = initializeApp(firebaseConfig);

// Get instances of auth and firestore
const authInstance = getAuth(app); // Change the variable name to authInstance
const firestoreInstance = getFirestore(app); // Change the variable name to firestoreInstance

export { authInstance as auth, firestoreInstance as firestore };
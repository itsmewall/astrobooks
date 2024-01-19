// firebase.js
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// view this

const firebaseConfig = {
    apiKey: "AIzaSyB_ZPnhP8TzOAbHt8Qa2XaGgbtCFuy3uOY",
    authDomain: "astrobooks-aa565.firebaseapp.com",
    projectId: "astrobooks-aa565",
    storageBucket: "astrobooks-aa565.appspot.com",
    messagingSenderId: "42748164126",
    appId: "1:42748164126:web:4bc680ec9bd42ff23bd60f",
    measurementId: "G-4EW3SD16RP"
};

const app = initializeApp(firebaseConfig);

export default app;
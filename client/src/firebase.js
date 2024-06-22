// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC2WKKhf0UN6BwkOKaOaZY5oh4ZWzIEcGw",
    authDomain: "billing-system-f074f.firebaseapp.com",
    projectId: "billing-system-f074f",
    storageBucket: "billing-system-f074f.appspot.com",
    messagingSenderId: "757242101495",
    appId: "1:757242101495:web:2ae764d0cf766f812eddf2",
    measurementId: "G-LJG571HNM3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup ,onAuthStateChanged };
export default app;

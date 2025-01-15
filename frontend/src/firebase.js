// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyC_Dl9cQ7bYgljVoz8Y0AJFiFlvoNh17so",
    authDomain: "devhub1-2569f.firebaseapp.com",
    projectId: "devhub1-2569f",
    storageBucket: "devhub1-2569f.firebasestorage.app",
    messagingSenderId: "733252965275",
    appId: "1:733252965275:web:4b247b5e02c2440b82473e",
    measurementId: "G-1XBERFMXNK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth and Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

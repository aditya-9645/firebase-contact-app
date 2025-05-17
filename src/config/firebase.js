// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsz5rg205Ld9yvMabt2dNpskXOL-4xVDY",
  authDomain: "vite-contact-d25b8.firebaseapp.com",
  projectId: "vite-contact-d25b8",
  storageBucket: "vite-contact-d25b8.firebasestorage.app",
  messagingSenderId: "1061459629180",
  appId: "1:1061459629180:web:67515f03e9a86a1f83e5f9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

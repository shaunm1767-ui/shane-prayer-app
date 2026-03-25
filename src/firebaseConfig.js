// firebaseConfig.js
// ==================
// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPbv7QREu9B7AAQ-_wNTVeMpLPrZWp88M",
  authDomain: "satsang-moments.firebaseapp.com",
  projectId: "satsang-moments",
  storageBucket: "satsang-moments.firebasestorage.app",
  messagingSenderId: "480844021527",
  appId: "1:480844021527:web:ecc798c23fefb403cfc152"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Auth for UI usage
export const auth = getAuth(app);

// ✅ Optional: export app in case you need other Firebase services later
export default app;
import { auth } from './firebaseConfig.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Example login function
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login SUCCESS:', userCredential.user.uid);
  } catch (error) {
    console.error('Login FAILED:', error.message);
  }
}
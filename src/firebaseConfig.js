// firebaseConfig.js
// ==================
// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-storage-90931.firebaseapp.com",
  projectId: "shane-storage-90931",
  storageBucket: "shane-storage-90931.appspot.com",
  messagingSenderId: "321117848066",
  appId: "1:321117848066:web:09e74895b8ecec3c475d1b"
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
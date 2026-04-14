import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// 🔥 FIREBASE CONFIG (FIXED ROOT CAUSE)
const firebaseConfig = {
  apiKey: "AIzaSyBrtiWYAhVd4lx3gyY3RtJk0GEn7MotRJI",
  authDomain: "shane-storage-90931.firebaseapp.com",
  projectId: "shane-storage-90931",
  
  // ✅ THIS IS THE CRITICAL FIX
  storageBucket: "shane-storage-90931.firebasestorage.app",

  messagingSenderId: "321117848066",
  appId: "1:321117848066:web:09e74895b8ecec3c475d1b",
};

// Init app
const app = initializeApp(firebaseConfig);

// Init storage (LOCKED TO CORRECT BUCKET)
export const storage = getStorage(app);

export default app;
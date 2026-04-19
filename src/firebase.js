import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ YOUR CONFIG (FIXED STORAGE BUCKET)
const firebaseConfig = {
  apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-prayer-app-2026-f2a3e.firebaseapp.com",
  projectId: "shane-prayer-app-2026-f2a3e",
  storageBucket: "shane-prayer-app-2026-f2a3e.appspot.com", // 🔥 FIXED
  messagingSenderId: "142736085758",
  appId: "1:142736085758:web:d15c27b44d6972b5de4baf",
};

// 🔥 INIT APP
const app = initializeApp(firebaseConfig);

// ✅ EXPORT THESE (CRITICAL)
export const auth = getAuth(app);
export const storage = getStorage(app);
// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-prayer-app-2026-f2a3e.firebaseapp.com",
  projectId: "shane-prayer-app-2026-f2a3e",
  storageBucket: "shane-prayer-app-2026-f2a3e.firebasestorage.app",
  messagingSenderId: "142736085758",
  appId: "1:142736085758:web:d15c27b44d6972b5de4baf",
  measurementId: "G-YF3G91KG35",
};

// INIT ONCE ONLY (this fixes your blank screen + no app errors)
const app = initializeApp(firebaseConfig);

// EXPORTS (THIS FIXES ALL "no export named auth/app" ERRORS)
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
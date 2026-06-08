import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-prayer-app-2026-f2a3e.firebaseapp.com",
  projectId: "shane-prayer-app-2026-f2a3e",
  storageBucket: "shane-prayer-app-2026-f2a3e.firebasestorage.app",
  messagingSenderId: "142736085758",
  appId: "1:142736085758:web:d15c27b44d6972b5de4baf"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
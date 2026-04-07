import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCiaayvLYeVvy1WjA1HMwncgUFlNBgzRT0",
  authDomain: "shane-prayer-app-2026.firebaseapp.com",
  projectId: "shane-prayer-app-2026",
  storageBucket: "shane-prayer-app-2026.firebasestorage.app",
  messagingSenderId: "608379916251",
  appId: "1:608379916251:web:fc40ea4a810de78d3121fe"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
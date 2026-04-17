import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "shane-prayer-app-2026.firebaseapp.com",
  projectId: "shane-prayer-app-2026",
  storageBucket: "shane-storage-90931.firebasestorage.app",
  messagingSenderId: "142736085758",
  appId: "1:142736085758:web:d15c27b44d6972b5de4baf"
};

// 🔥 Initialize Firebase ONCE
const app = initializeApp(firebaseConfig);

// 🔥 Export storage (this is key)
export const storage = getStorage(app);
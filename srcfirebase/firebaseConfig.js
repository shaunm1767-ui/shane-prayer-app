import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrtiWYAhVd4lx3gyY3RtJk0GEn7MotRJI",
  authDomain: "shane-storage-90931.firebaseapp.com",
  projectId: "shane-storage-90931",
  storageBucket: "shane-storage-90931.appspot.com",
  messagingSenderId: "321117848066",
  appId: "1:321117848066:web:09e74895b8ecec3c475d1b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
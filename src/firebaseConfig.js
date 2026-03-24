import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPbv7QREu9B7AAQ-_wNTVeMpLPrZWp88M",
  authDomain: "satsang-moments.firebaseapp.com",
  projectId: "satsang-moments",
  storageBucket: "satsang-moments.appspot.com",
  messagingSenderId: "480844021527",
  appId: "1:480844021527:web:ed638730391a5d34cfc152"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
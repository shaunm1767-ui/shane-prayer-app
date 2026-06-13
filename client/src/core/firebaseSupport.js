import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// ⚠️ Replace with your existing config if already in project
const firebaseConfig = {
 apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-prayer-app-2026-f2a3e.firebaseapp.com",
  projectId: "shane-prayer-app-2026-f2a3e",
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function sendSupportRequest(data) {
  try {
    await addDoc(collection(db, "support_requests"), {
      ...data,
      createdAt: serverTimestamp(),
      status: "new",
    });

    return true;
  } catch (error) {
    console.error("Support request failed:", error);
    return false;
  }
}
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Optional: analytics ONLY if browser supports it safely
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCofVQ2vhydFPPxVyfkRMqA6_fqqMs9H1s",
  authDomain: "shane-prayer-app-2026-f2a3e.firebaseapp.com",
  projectId: "shane-prayer-app-2026-f2a3e",
  storageBucket: "shane-prayer-app-2026-f2a3e.appspot.com",
  messagingSenderId: "142736085758",
  appId: "1:142736085758:web:d15c27b44d6972b5de4baf",
  measurementId: "G-YF3G91KG35",
};

// INIT APP
const app = initializeApp(firebaseConfig);

// FIRESTORE (main backend)
export const db = getFirestore(app);

// SAFE ANALYTICS (prevents blank screen crashes)
let analytics = null;

isSupported().then((yes) => {
  if (yes) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app;
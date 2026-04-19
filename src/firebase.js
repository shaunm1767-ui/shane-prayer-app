import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
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

// INIT
const app = initializeApp(firebaseConfig);

// SERVICES
const auth = getAuth(app);
const storage = getStorage(app);

// SAFE ANALYTICS (production-grade fix)
let analytics = null;

isSupported()
  .then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  })
  .catch(() => {
    console.warn("Analytics not supported - skipped safely");
  });

export { app, auth, storage, analytics };
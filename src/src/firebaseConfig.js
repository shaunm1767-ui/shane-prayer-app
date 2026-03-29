import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "demo-key",
  authDomain: "demo.firebaseapp.com",
  projectId: "demo-project",
  storageBucket: "demo.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:demo"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;